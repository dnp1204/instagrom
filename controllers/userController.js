const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = {
  async followUser(req, res, next) {
    const { userId, list } = req.params;
    try {
      const user = await User.findById(userId).populate('followers');
      const prevLength = req.user.following.length;

      for (let i = 0; i < prevLength; i += 1) {
        if (req.user.following[i].toString() === userId.toString()) {
          req.user.following.splice(i, 1);

          for (let j = 0; j < user.followers.length; j += 1) {
            if (user.followers[j]._id.toString() === req.user._id.toString()) {
              user.followers.splice(j, 1);
              break;
            }
          }
          break;
        }
      }

      if (prevLength === req.user.following.length) {
        req.user.following.push(user);
        user.followers.push(req.user);
      }

      await req.user.save();
      await user.save();

      if (list) {
        const newFollowingList = await User.findById(req.user._id).populate(
          'following'
        );
        res.send({
          postFollowing: newFollowingList.following,
          following: req.user.following
        });
      } else {
        res.send({ followers: user.followers, following: req.user.following });
      }
    } catch (err) {
      next(err);
    }
  },

  async searchUser(req, res, next) {
    const { key } = req.params;
    const name = new RegExp(key.toLowerCase(), 'i');

    try {
      // const user = User.find({ $text: { $search: key } });
      // const users = await User.find({
      //   firstName: { $regex: name },
      //   lastName: { $regex: name }
      // });
      const users = await User.aggregate([
        {
          $project: {
            name: { $concat: ['$firstName', ' ', '$lastName'] },
            avatar: '$avatar',
            email: '$email'
          }
        },
        { $match: { name: { $regex: name } } }
      ]).limit(20);
      res.send(users);
    } catch (err) {
      next(err);
    }
  },

  async getFollowing(req, res, next) {
    try {
      const user = await User.findById(req.user._id).populate({
        path: 'following',
        populate: {
          path: 'posts',
          model: 'post',
          options: {
            sort: { createdAt: -1 },
            limit: 6
          },
          populate: [
            {
              path: 'comments',
              model: 'comment',
              options: {
                sort: { createdAt: 1 }
              },
              populate: {
                path: 'user',
                model: 'user'
              }
            },
            {
              path: 'likes',
              model: 'user'
            }
          ]
        }
      });
      res.send(user.following);
    } catch (err) {
      next(err);
    }
  },

  async deleteAvatar(req, res, next) {
    const url =
      'https://www.rhinodigital.com/wp-content/uploads/2016/12/blank-user.jpg';
    const { userId } = req.params;

    try {
      await User.findByIdAndUpdate({ _id: userId }, { avatar: url });
      res.send(url);
    } catch (err) {
      next(err);
    }
  }
};
