'use strict';
module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define('List', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        List.hasMany(models.ListItem, {
          as: 'items',
          onDelete: 'cascade'
        });
        List.belongsTo(models.User, {
          foreignKey: 'user_id',
          as: 'user'
        });

        List.addScope('withUser', {
          include: [{ model: models.User, as: 'user' }]
        });

        List.addScope('allAssoc', {
          include: [{ model: models.User, as: 'user' }, { model: models.ListItem, as: 'items' }]
        });
      }
    }
  });
  return List;
};