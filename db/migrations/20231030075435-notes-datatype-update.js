'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('sightings', 'notes', {
      type: Sequelize.TEXT,
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('sightings', 'notes', {
      type: Sequelize.STRING,
    });
  }
};
