const mongoose = require('mongoose');

const Post = mongoose.model('post');

module.exports = app => {
  app.post('/post/new', async (req, res) => {
    const postParams = req.body;
    const newPost = await Post.create(postParams);
    req.user.posts.push(newPost);
    await req.user.save();
    res.send(newPost);
  });
};