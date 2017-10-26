const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = {
  async followUser(req, res, next) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      const index = req.user.following.indexOf(user);
      if (index === -1) {
        req.user.following.push(user);
        user.followers.push(req.user);
      } else {
        req.user.following.splice(index, 1);
        const index2 = user.followers.indexOf(req.user);
        user.followers.splice(index2, 1);
      }
      await req.user.save();
      await user.save();
      res.send(req.user.following);
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
        { $project: { name: { $concat: ['$firstName', ' ', '$lastName'] }, avatar: '$avatar' } },
        { $match: { name: { $regex: name } } }
      ]).limit(20);
      res.send(users);
    } catch (err) {
      next(err);
    }
  }
};
