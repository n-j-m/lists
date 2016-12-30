'use strict';
const { getSalt, generatePasswordHash, hashPassword } = require('../utils/crypto');

function onBeforeCreate (user, options) {
  return hashPassword(user.password)
    .then((hashedPassword) => user.password = hashedPassword);
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: { msg: 'Must be a valid email address' } },
      unique: true,
    },
    password: DataTypes.STRING,
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },

      verify (email, password) {
        return User.findOne({ where: { email } })
          .then((user) => {
            if (!user) {
              return false;
            }

            const salt = getSalt(user.password);

            return generatePasswordHash(password, salt)
              .then((hashedPassword) => hashedPassword === user.password ? user : false);
          });
      }
    }
  });

  User.beforeCreate(onBeforeCreate);

  return User;
};
