const { getSightings } = require("../utils.js");

class SightingController {
  async getAllSightings(req, res) {
    try {
      const sightings = await getSightings();
      res.json(sightings);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error fetching sightings", error: error.message });
    }
  }
  async getSightingByIndex(req, res) {
    try {
      const sightings = await getSightings();

      // Extract the sightingIndex from req.params and adjust for 0-indexing
      const sightingIndex = parseInt(req.params.sightingIndex, 10) - 1;

      // Check if sightingIndex is a valid number and within the array bounds
      if (
        isNaN(sightingIndex) ||
        sightingIndex < 0 ||
        sightingIndex >= sightings.length
      ) {
        return res.status(404).json({ message: "Sighting not found" });
      }

      // Return the specific sighting
      res.json(sightings[sightingIndex]);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error fetching sighting", error: error.message });
    }
  }
}

module.exports = SightingController;
