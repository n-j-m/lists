const jwt = require('jsonwebtoken');
const setUserInfo = require('../utils/setUserInfo');
const { User } = require('../models');

function generateToken (user) {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "1d"
  });
}

module.exports = {
  login (req, res, next) {
    const user = setUserInfo(req.user);
    res.status(200).json({
      token: `JWT ${generateToken(user)}`,
      user
    });
  },

  register (req, res, next) {
    User.create(req.body)
      .then((user) => {
        const userInfo = setUserInfo(user);
        res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user: userInfo
        });
      })
      .catch(next);
  }
};
