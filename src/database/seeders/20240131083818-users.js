'use strict';
const { v4: uuidv4 } = require('uuid');
const argon2 = require('argon2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let [template, func] = await queryInterface.sequelize.query(`Select count(*) from "Users"`);

    if (template[0]?.count <= 0) {

      const hashedPassword = await argon2.hash('Admin@123'); // Hashing the password

      queryInterface.bulkInsert("Users", [
        {
          userId: uuidv4(),
          username: 'SuperAdmin',
          email: 'webbermill@gmail.com',
          password: hashedPassword, // Use the hashed password
          isLogin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
        {}
      );
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
