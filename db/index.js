const { readFile } = require("fs/promises");

async function parseAllSightings() {
  // Retrieve sightings.json file contents as string
  const sightings = await readFile("./db/sightings.json", "utf8");
  // Return sightings as an object
  return JSON.parse(sightings);
}

module.exports = {
  getAllSightings: async ({ year }) => {
    const sightings = await parseAllSightings();
    const filteredSightings = year
      ? sightings.filter(({ YEAR }) => YEAR === year)
      : sightings;

    return filteredSightings;
  },

  getOneSighting: async (sightingIndex) => {
    const sightings = await parseAllSightings();
    const reqIndex = parseInt(sightingIndex);
    return sightings.slice(reqIndex, reqIndex + 1);
  },
};
