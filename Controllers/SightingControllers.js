class SightingsController {
  constructor(getSightings) {
    this.getSightings = getSightings;
  }

  getAllData = async (req, res) => {
    const sightings = await this.getSightings();
    res.json(sightings);
  };

  getOneData = async (req, res) => {
    const sightings = await this.getSightings();
    res.json(sightings[req.params.sightingIndex]);
  };

  getFilterData = async (req, res) => {
    const sightings = await this.getSightings();
    const filter = req.params.filter;
    const filterData = req.params.filterData;
    const output = sightings.filter(
      (data) => data[filter].toLowerCase() && data[filter].includes(filterData)
    );
    res.json(output);
  };
}

module.exports = SightingsController;
