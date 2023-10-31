// Will make API calls/handle business logic in the controller
// Import axios
const axios = require("axios");

// Boilerplate to simulate getting data from database
// const { getSightings } = require(`../utils.js`);
// const { Pool } = require("pg");

class sightingIndexController {
  constructor(pool) {
    this.pool = pool;
  }

  test = (req, res) => {
    return res.send("I am in my Items Controller");
  };

  getSighting = async (req, res) => {
    console.log(req.params);
    console.log("hello");
    // const sightings = await getSightings();

    // return res.json(sightings[req.params.sightingID]);
  };

  getAll = (req, res) => {
    const sqlQuery = "SELECT * FROM sightings;";
    this.pool.query(sqlQuery, (err, results) => {
      if (err) {
        console.log("there has been an error!");
        return res.json({ success: false, msg: err });
      }
      const data = results.rows;
      return res.json({ success: true, data });
    });
  };

  createOne = async (req, res) => {
    const { date, location, notes } = req.body;

    if (!date || !location || !notes) {
      return res.status(400).json({ success: false, msg: "Input error!" });
    }

    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });

      return res.josn({ success: true, sighting: newSighting });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };
}

module.exports = sightingIndexController;

// const getAllSightings = async (req, res) => {
//   try {
//     const sightings = await getSightings();
//     const filteredSightings = Object.keys(req.query).reduce((acc, key) => {
//       // Convert the key to uppercase to match the JSON keys (assuming they are uppercase)
//       const field = key.toUpperCase();
//       // Check if the sighting has the field and if the field matches the query value
//       return acc.filter(
//         (sighting) =>
//           sighting[field] && String(sighting[field]) === String(req.query[key])
//       );
//     }, sightings);
//     res.json(filteredSightings);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Error fetching sightings", error: error.message });
//   }
// };
