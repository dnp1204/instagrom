const mongoose = require('mongoose');

const Post = mongoose.model('post');
const Comment = mongoose.model('comment');

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
  },

  async deletePost(req, res, next) {
    const { postId } = req.params;

    try {
      const deletePost = await Post.findByIdAndRemove(postId);
      res.send(deletePost);
    } catch (err) {
      next(err);
    }
  },

  async detailPost(req, res, next) {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId);
      res.send(post);
    } catch (err) {
      next(err);
    }
  },

  async updatePost(req, res, next) {
    const { postId } = req.params;
    const postParams = req.body;

    try {
      const post = await Post.findByIdAndUpdate(postId, postParams);
      res.send(post);
    } catch (err) {
      next(err);
    }
  },

  async likePost(req, res, next) {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId);
      const index = post.likes.indexOf(req.user);
      if (index === -1) {
        post.likes.push(req.user);
      } else {
        post.likes.splice(index, 1);
      }
      await post.save();
      res.send(post);
    } catch (err) {
      next(err);
    }
  },

  async commentPost(req, res, next) {
    const { postId } = req.params;
    const { content } = req.body;

    try {
      const newComment = await Comment.create({ content, user: req.user });
      const post = await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment }
      });
      res.send(newComment, post);
    } catch (err) {
      next(err);
    }
  },

  async likeComment(req, res, next) {
    const { commentId, postId } = req.params;

    try {
      const comment = await Comment.findById(commentId);
      const index = comment.likes.indexOf(req.user);
      if (index === -1) {
        comment.likes.push(req.user);
      } else {
        comment.likes.splice(index, 1);
      }
      const post = await Post.findById(postId);
      await comment.save();
      res.send(post, comment);
    } catch (err) {
      next(err);
    }
  }
};
