const mongoose = require('mongoose');

const Post = mongoose.model('post');

module.exports = {
  async createPost(req, res, next) {
    const postParams = req.body;

    try {
      const newPost = await Post.create(postParams);
      req.user.posts.push(newPost);
      await req.user.save();
      res.send(newPost);
    } catch (err) {
      next(err);
    }
  }
};
