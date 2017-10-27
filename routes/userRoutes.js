const UserController = require('../controllers/userController');

module.exports = app => {
  app.get('/api/:userId/following', UserController.followUser);
  app.get('/api/:userId/:key', UserController.searchUser);
  app.get('/api/following', UserController.getFollowing);
};