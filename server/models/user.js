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
    defaultScope: {
      attributes: ['id', 'email', 'first_name', 'last_name', 'bio']
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.List, {
          as: 'lists',
          onDelete: 'cascade'
        });

        User.addScope('withLists', {
          include: [{ model: models.List, as: 'lists' }]
        });

        User.addScope('forVerification', {
          attributes: ['id', 'email', 'password']
        })
      },

      verify (email, password) {
        return User.scope('forVerification').findOne({ where: { email } })
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
