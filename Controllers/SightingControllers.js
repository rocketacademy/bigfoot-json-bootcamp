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
      (data) => data[filter] && data[filter].toLowerCase().includes(filterData)
    );
    res.json(output);
  };

  getSortData = async (req, res) => {
    const sightings = await this.getSightings();
    const sort = req.params.sort;
    const direction = req.params.direction;
    sightings.sort((a, b) =>
      !a[sort]
        ? 1
        : !b[sort]
        ? -1
        : direction === "ascending"
        ? a[sort].match(/\d+/) - b[sort].match(/\d+/)
        : b[sort].match(/\d+/) - a[sort].match(/\d+/)
    );

    res.json(sightings);
  };
}

module.exports = SightingsController;
