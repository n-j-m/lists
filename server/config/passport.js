const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');


module.exports = function initPassport (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.verify(email, password)
      .then((user) => {
        if (user) {
          done(null, user);
        }
        else {
          done(null, false, { error: 'The email and password entered are not valid' });
        }
      })
      .catch(done);
  }));

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.SECRET_KEY
  }, (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          done(null, user);
        }
        else {
          done(null, false);
        }
      });
  }));
};
