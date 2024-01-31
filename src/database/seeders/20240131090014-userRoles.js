'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let [user] = await queryInterface.sequelize.query(`SELECT id FROM "Users" LIMIT 1`);
    let [role] = await queryInterface.sequelize.query(`SELECT id FROM "Roles" LIMIT 1`);

    const firstUserId = user[0]?.id || 1; // Default to 1 if no user found
    const firstRoleId = role[0]?.id || 1; // Default to 1 if no role found

    await queryInterface.bulkInsert("UserRoles", [
      {
        userId: firstUserId,
        roleId: firstRoleId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserRoles", null, {});
  }
};
