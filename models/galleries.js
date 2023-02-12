'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class galleries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      galleries.belongsTo(models.category,{foreignKey:"categoryId"})
      galleries.belongsTo(models.User,{foreignKey:"userId"});
      galleries.hasMany(models.favorates,{foreignKey:"picId"})
      galleries.hasMany(models.likes,{foreignKey:"picId"})

    }
  }
  galleries.init({
    url: DataTypes.STRING,
    user_Id: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'galleries',
  });
  return galleries;
};