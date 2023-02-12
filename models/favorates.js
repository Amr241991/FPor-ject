'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorates.belongsTo(models.User,{foreignKey:"userId"});
      favorates.belongsTo(models.galleries,{foreignKey:"picId"});    }
  }
  favorates.init({
    picId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorates',
  });
  return favorates;
};