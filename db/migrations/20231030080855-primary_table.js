"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("sightings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      date: {
        type: Sequelize.DATE,
        // unique: false,
        // allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        // unique: false,
        // allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        // unique: false,
        // allowNull: false,
      },

      created_at: {
        // allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("sightings");
  },
};
