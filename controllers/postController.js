const mongoose = require('mongoose');

const User = mongoose.model('user');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');

const findUser = async userId => {
  const user = await User.findById(userId)
    .populate({
      path: 'posts',
      populate: [
        {
          path: 'comments',
          model: 'comment',
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
    })
    .populate('following')
    .populate('followers');

  return user;
};

module.exports = {
  async getPosts(req, res, next) {
    const { userId } = req.params;

    try {
      let user;
      if (userId) {
        user = await findUser(userId);
      } else {
        user = await findUser(req.user._id);
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  },

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
      await Post.findByIdAndRemove(postId);
      const user = await findUser(req.user._id);
      res.send(user);
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
    const { postId, userId } = req.params;
    try {
      const post = await Post.findById(postId)
        .populate('likes')
        .populate({
          path: 'comments',
          model: 'comment',
          options: {
            sort: { createdAt: 1 }
          },
          populate: {
            path: 'user',
            model: 'user'
          }
        });
      const prevLength = post.likes.length;
      for (let i = 0; i < post.likes.length; i += 1) {
        if (post.likes[i]._id.toString() === req.user._id.toString()) {
          post.likes.splice(i, 1);
          break;
        }
      }
      if (prevLength === post.likes.length) {
        post.likes.push(req.user);
      }

      await post.save();

      let user;
      if (userId) {
        user = await findUser(userId);
        post.userName = user.fullName;
        post.userAvatar = user.avatar;
        post.userId = user._id;
      } else {
        user = await findUser(req.user._id);
      }

      res.send({ user, post });
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
      })
        .populate('likes')
        .populate({
          path: 'comments',
          model: 'comment',
          options: {
            sort: { createdAt: 1 }
          },
          populate: {
            path: 'user',
            model: 'user'
          }
        });
      res.send({ post, comment: newComment });
    } catch (err) {
      next(err);
    }
  },

  async deleteComment(req, res, next) {
    const { commentId, postId } = req.params;

    try {
      await Comment.findByIdAndRemove(commentId);
      const post = await Post.findById(postId)
        .populate('likes')
        .populate({
          path: 'comments',
          model: 'comment',
          options: {
            sort: { createdAt: 1 }
          },
          populate: {
            path: 'user',
            model: 'user'
          }
        });
      res.send(post);
    } catch (err) {
      next(err);
    }
  }
};
