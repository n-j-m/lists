const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');
const listController = require('../controllers/list');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function initRoutes (app) {
  const apiRoutes = Router();
  const authRoutes = Router();

  apiRoutes.use('/auth', authRoutes);

  authRoutes.use('/register', authController.register);
  authRoutes.use('/login', requireLogin, authController.login);

  apiRoutes.get('/lists', requireAuth, listController.index);
  apiRoutes.post('/lists', requireAuth, listController.create);
  apiRoutes.get('/lists/:id', requireAuth, listController.show);
  apiRoutes.put('/lists/:id', requireAuth, listController.update);
  apiRoutes.delete('/lists/:id', requireAuth, listController.delete);

  apiRoutes.use('/protected', requireAuth, (req, res) => {
    res.status(200).json({ hello: 'world' });
  });

  app.use('/api/v1', apiRoutes);
};
