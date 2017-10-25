const PostController = require('../controllers/postController');

module.exports = app => {
  app.post('/api/post/new', PostController.createPost);
  app.get('/api/post/:pollId', PostController.detailPost);
  app.delete('/api/post/:pollId', PostController.deletePost);
  app.put('/api/post/:pollId', PostController.updatePost);
  app.put('/api/post/:pollId/like', PostController.likePost);
  app.put('/api/post/:pollId/comment', PostController.commentPost);
  app.put('/api/post/:pollId/:commentId/like', PostController.likeComment);
};