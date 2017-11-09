const UserController = require('../controllers/userController');

module.exports = app => {
  app.get('/api/:userId/following', UserController.followUser);
  app.get('/api/:userId/:list/following', UserController.followUser);
  app.get('/api/:userId/:key', UserController.searchUser);
  app.get('/api/following', UserController.getFollowing);

  app.put('/api/:userId/deleteAvatar', UserController.deleteAvatar);
};