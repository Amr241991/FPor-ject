'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('galleries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      user_Id: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:"Users"
        },
        key: "id"
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
         references:{
          model:{
          tableName:'categories'
      },
        key:"id"
         }
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('galleries');
  }
};