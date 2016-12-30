'use strict';
module.exports = function(sequelize, DataTypes) {
  var ListItem = sequelize.define('ListItem', {
    description: DataTypes.TEXT,
    complete: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ListItem;
};