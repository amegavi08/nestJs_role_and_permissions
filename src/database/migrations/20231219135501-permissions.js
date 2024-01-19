'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      permissionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },

      // roleId: {
      //   type: Sequelize.UUID,
      //   defaultValue: Sequelize.UUIDV4,
      //   allowNull: false,
      //   references: {
      //     model:{
      //       tableName: 'Roles',
      //     },
      //     key:'roleId'
      //   },
      //   onDelete: 'CASCADE'
      // },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Permissions');
  }
};
