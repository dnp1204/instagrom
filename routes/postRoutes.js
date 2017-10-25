const PostController = require('../controllers/postController');

module.exports = app => {
  app.post('/post/new', PostController.createPost);
};