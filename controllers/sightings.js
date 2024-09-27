const { getAllSightings, getOneSighting } = require("../db");

module.exports = {
  async getAllSightings(req, res) {
    const sightings = await getAllSightings(req.query);
    res.json(sightings);
  },

  async getOneSighting(req, res) {
    const sighting = await getOneSighting(req.params.sightingIndex);
    if (sighting) res.json(sighting);
    else res.status(500).json({ error: "Unexpected error" });
  },
};
