const { getSightings } = require("../utils.js");

class SightingsController {
  constructor() {}

  async getData(req, res) {
    const sightings = await getSightings();
    const { id } = req.params;
    const data = sightings[id];
    return res.json(data);
  }

  async getLinks(req, res) {
    let { filter } = req.query;
    const links = [];
    let sightings = await getSightings();

    if (!filter) {
      filter = "";
    }

    sightings.map((value, index) => {
      if (value.SEASON) {
        if (value.SEASON.includes(filter)) {
          const link = {
            INDEX: index,
            REPORT_NUMBER: value.REPORT_NUMBER,
            YEAR: value.YEAR,
            MONTH: value.MONTH,
          };
          links.push(link);
        }
      }
    });
    return res.json(links);
  }
}

module.exports = SightingsController;
