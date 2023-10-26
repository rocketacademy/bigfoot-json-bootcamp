const { getSightings } = require("../utils.js");

class SightingController {
  async getAllSightings(req, res) {
    try {
      const sightings = await getSightings();

      // Filtering for all items based on exact equality
      const filteredSightings = Object.keys(req.query).reduce((acc, key) => {
        if (key !== "sortBy" && key !== "order") {
          const field = key.toUpperCase();
          return acc.filter(
            (sighting) =>
              sighting[field] &&
              String(sighting[field]) === String(req.query[key])
          );
        }
        return acc;
      }, sightings);

      // Sorting logic by ascending or descending
      if (req.query.sortBy) {
        const sortBy = req.query.sortBy.toUpperCase();
        const order = req.query.order || "asc"; // default to ascending

        filteredSightings.sort((a, b) => {
          const valA = a[sortBy] ? String(a[sortBy]).toLowerCase() : "";
          const valB = b[sortBy] ? String(b[sortBy]).toLowerCase() : "";

          if (valA < valB) return order === "asc" ? -1 : 1;
          if (valA > valB) return order === "asc" ? 1 : -1;
          return 0;
        });
      }

      res.json(filteredSightings);
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
