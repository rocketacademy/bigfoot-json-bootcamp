'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await Promise.all([
      queryInterface.addColumn('sightings', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('sightings', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('sightings', 'created_at', {}),
      queryInterface.removeColumn('sightings', 'updated_at', {})
    ])
  }
};
