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
    const filterData = req.params.filterData.toLowerCase();
    const output = sightings.filter(
      (data) => data[filter] && data[filter].includes(filterData)
    );
    res.json(output);
  };
}

module.exports = SightingsController;
