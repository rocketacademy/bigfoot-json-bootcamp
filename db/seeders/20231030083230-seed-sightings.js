"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "sightings",
      [
        {
          date: new Date(1990, 9),
          location: "East side of Prince William Sound, Alaska, USA",
          notes:
            "Ed L. was salmon fishing with a companion in Prince William Sound. After anchoring off shore, his companion took a small boat up a river to check on the state of the salmon run. As the day wore on toward evening and he didn't come back at the expected time, Ed scanned upriver and across the adjacent land with binoculars. There he saw a sasquatch walking across the tundra, with long, smooth steps and with dark hair flowing from its shoulders, bouncing behind \"like a cape\" at every step. The sasquatch paid no attention to the boat (distance about 1,000').",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: new Date(2000, 9, 2),
          location: "Warren County, New Jersey, USA",
          notes: "helasdasdao",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: new Date(2016, 6, 7),
          location: "Sullivan County, New Hampshire, USA",
          notes:
            "I was on my way to Claremont from Lebanon on Rte 120 and was passing by some reeds in a marshy area next to the road that sounded like a huge flock of birds. The creature came out of the reeds and was crouched down looking at me through them. Surprisingly it got out of the reeds from crouched to standing turned around and ran towards the wooded area up a hill and was moving with it's arms brush and tree branches out of the way. It was incredibly fast runner and I got a good look at its coconut shaped head as it ran away. It was light brown/brown. It had incredibly broad shoulders. I went back the same day. The marsh went up to my knees and I could smell a bad odor like garbage. Myself and a friend went back to the sighting. We found a footprint and a hair sample. I could hear wood knocks when my friend James did a call and we also found a large bed of branches and some tree structures. The following month I went back to Claremont and I heard screeching in the woods while I was traveling Rte. 120 on a bicycle.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sightings", null, {});
  },
};
