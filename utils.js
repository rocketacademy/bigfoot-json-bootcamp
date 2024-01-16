const { readFile } = require("fs/promises");

const getSightings = async () => {
  // Retrieve sightings.json file contents as string
  //utf-8 - coding language for the characters
  const sightings = await readFile("./sightings.json", "utf8");
  // Return sightings as an object
  return JSON.parse(sightings);
};

module.exports = {
  getSightings,
};
