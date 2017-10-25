const UserController = require('../controllers/userController');

module.exports = app => {
  app.get('/api/:userId/following', UserController.followUser);
};