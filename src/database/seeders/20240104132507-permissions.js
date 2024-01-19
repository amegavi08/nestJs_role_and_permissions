'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let [template, func] = await queryInterface.sequelize.query(`Select count(*) from "Permissions"`);
   
    if(template[0]?.count <= 0){
      
      queryInterface.bulkInsert("Permissions", [
       {
        permissionId: uuidv4(),
         name: 'view_users',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         permissionId: uuidv4(),
         name: 'edit_users',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        permissionId: uuidv4(),
        name: 'delete_users',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        permissionId: uuidv4(),
        name: 'update_users',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     
     ],
     {}
     );
   }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {});
  }
};
