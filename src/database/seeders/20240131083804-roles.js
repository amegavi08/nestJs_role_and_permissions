'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let [template, func] = await queryInterface.sequelize.query(`Select count(*) from "Roles"`);

    if (template[0]?.count <= 0) {

      queryInterface.bulkInsert("Roles", [
        {
          roleId: uuidv4(),
          name: 'SuperAdmin',
          is_Super: true,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
        {}
      );
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  }
};
