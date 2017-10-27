const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = {
  async followUser(req, res, next) {
    const { userId } = req.params;
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
      res.send(user.followers);
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
  }
};
