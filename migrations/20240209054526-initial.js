'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    
        CREATE TABLE IF NOT EXISTS public.users
        (
            userid integer PRIMARY KEY,
            username VARCHAR(150),
            email VARCHAR(150) UNIQUE,
            password VARCHAR(60),
            profileimage TEXT
        );

        ALTER TABLE "users"
        ADD COLUMN isActive BOOLEAN DEFAULT true;
        `
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DROP TABLE IF EXIST
    `)
  }
};
