// Will make API calls/handle business logic in the controller
// Import axios
const axios = require("axios");

// Boilerplate to simulate getting data from database
const { getSightings } = require(`../utils.js`);

class sightingIndexController {
  constructor() {}

  test = (req, res) => {
    return res.send("I am in my Items Controller");
  };

  getSighting = async (req, res) => {
    console.log(req.params);
    console.log("hello");
    const sightings = await getSightings();
    // console.log(sightings[0]);

    return res.json(sightings[req.params.sightingID]);
  };

  // pokemon = async (req, res) => {
  //   console.log(req.params);
  //   const { name } = req.params;
  //   const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  //   const pokeData = await axios.get(url);
  //   console.log("I GOT THE DATA!");

  //   return res.json({ data: pokeData.data });
  // };
}

module.exports = sightingIndexController;

const getAllSightings = async (req, res) => {
  try {
    const sightings = await getSightings();
    const filteredSightings = Object.keys(req.query).reduce((acc, key) => {
      // Convert the key to uppercase to match the JSON keys (assuming they are uppercase)
      const field = key.toUpperCase();
      // Check if the sighting has the field and if the field matches the query value
      return acc.filter(
        (sighting) =>
          sighting[field] && String(sighting[field]) === String(req.query[key])
      );
    }, sightings);
    res.json(filteredSightings);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching sightings", error: error.message });
  }
};
