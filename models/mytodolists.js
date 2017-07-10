'use strict';
module.exports = function(sequelize, DataTypes) {
  var mytodolist = sequelize.define('mytodolist', {
    title: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return mytodolist;
};
