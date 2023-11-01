"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content: "Saw a tiktok video to prove this.",
          sighting_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "Can confirm, it's real",
          sighting_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "I believe this is fake",
          sighting_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
