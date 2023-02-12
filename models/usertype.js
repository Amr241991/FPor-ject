'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userType.hasMany(models.User,{foreignkey:"userTypeId"})
    }
  }
  userType.init({
    Type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userType',
  });
  return userType;
};