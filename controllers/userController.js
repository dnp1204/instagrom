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
  }
};