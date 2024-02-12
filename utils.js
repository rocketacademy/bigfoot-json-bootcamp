const { readFile } = require("fs/promises");

const getSightings = async () => {
  // Retrieve sightings.json file contents as string
  const sightings = await readFile("./sightings.json", "utf8");
  // Return sightings as an object
  return JSON.parse(sightings);
};

async function getSightingsIndexSelected(sightingsIndex) {
  const data = await readFile("./sightings.json", "utf-8");
  const sightings = JSON.parse(data);
  return sightings[sightingsIndex];
}

module.exports = {
  getSightings,
  getSightingsIndexSelected,
};
