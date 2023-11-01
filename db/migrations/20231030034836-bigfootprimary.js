'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sightings',{
      id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type:Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      notes: {
        type:Sequelize.STRING,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sightings');
  }
};
