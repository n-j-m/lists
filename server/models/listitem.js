'use strict';

function reorderBeforeCreate (List, ListItem) {
  return (item, options) => {
    const list_id = item.list_id;
    return ListItem.max('order', {
      where: { list_id }
    })
      .then((maxOrder) => item.order = (maxOrder || 0) + 1);
  }
}

module.exports = function(sequelize, DataTypes) {
  var ListItem = sequelize.define('ListItem', {
    description: DataTypes.TEXT,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    order: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        const List = models.List;

        ListItem.beforeCreate(reorderBeforeCreate(List, ListItem));
      }
    }
  });
  return ListItem;
};