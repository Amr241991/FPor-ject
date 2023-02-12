'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    postId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    postImg: DataTypes.STRING,
    postUsername: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};