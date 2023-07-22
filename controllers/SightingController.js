const { getSightings } = require("../utils.js");

class SightingController {
  constructer() {}

  cleanSightingData = (sightingData) => {
    /// Clean Data
    // remove those not in clean year format
    sightingData = sightingData.filter((sighting) =>
      Number.isInteger(Number(sighting.YEAR))
    );
    // remove those undefined month
    sightingData = sightingData.filter((sighting) => sighting.MONTH);

    // add ID info to persist index after filtering/ sorting
    sightingData = sightingData.map((sighting, index) => ({
      ...sighting,
      id: index,
    }));

    return sightingData;
  };

  listSighting = async (req, res) => {
    let sightings = this.cleanSightingData(await getSightings());
    res.json(sightings[req.params.sightingIndex]);
  };

  listSightingsWithFilterAndSort = async (req, res) => {
    const sightings = this.cleanSightingData(await getSightings());
    const season = req.params.season;
    const year = req.params.year;
    const month = req.params.month;
    const sortYear = req.params.sortYear;
    const sortState = req.params.sortState;
    let results = sightings;

    /// Filter data according to user input
    if (year !== "0") {
      results = results.filter((sighting) => sighting.YEAR === year);
    }

    if (month !== "0") {
      results = results.filter((sighting) => sighting.MONTH === month);
    }

    if (season !== "0") {
      results = results.filter((sighting) => sighting.SEASON === season);
    }

    /// Sort data according to user input
    // by year
    if (sortYear !== "0") {
      results.sort(function (a, b) {
        return a.YEAR - b.YEAR;
      });
    }

    // by state
    if (sortState !== "0") {
      results.sort(function (a, b) {
        var x = a.STATE.toLowerCase();
        var y = b.STATE.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }

    // app.get("/sightings/filter?", async (req, res) => {
    //   const params = req.query.year;
    //   res.send(params);
    // });

    res.json(results);
  };
}

module.exports = SightingController;
