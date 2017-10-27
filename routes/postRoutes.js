const PostController = require('../controllers/postController');

module.exports = app => {
  app.get('/api/post/:userId', PostController.getPosts);
  app.get('/api/post', PostController.getPosts);
  app.post('/api/post/new', PostController.createPost);
  app.get('/api/post/:postId', PostController.detailPost);
  app.delete('/api/post/:postId', PostController.deletePost);
  app.put('/api/post/:postId', PostController.updatePost);
  app.put('/api/post/:postId/like', PostController.likePost);
  app.put('/api/post/:postId/comment', PostController.commentPost);
  app.put('/api/post/:postId/:commentId/like', PostController.likeComment);
};