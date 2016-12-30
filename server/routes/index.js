const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function initRoutes (app) {
  const apiRoutes = Router();
  const authRoutes = Router();

  apiRoutes.use('/auth', authRoutes);

  authRoutes.use('/register', authController.register);
  authRoutes.use('/login', requireLogin, authController.login);

  apiRoutes.use('/protected', requireAuth, (req, res) => {
    res.status(200).json({ hello: 'world' });
  });

  app.use('/api/v1', apiRoutes);
};
