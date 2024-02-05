class SightingsController {
  constructor(getSightings) {
    this.getSightings = getSightings;
  }

  getAllData = async (req, res) => {
    const sightings = await this.getSightings();
    res.json(sightings);
  };

  getOneData = async (req, res) => {
    const { sightingIndex } = req.params;
    if (isNaN(Number(sightingIndex))) {
      return res.status(400).send({ error: true, msg: "Wrong Type" });
    }
    const sightings = await this.getSightings();
    res.json(sightings[sightingIndex]);
  };

  getFilterData = async (req, res) => {
    const { filter, filterData } = req.params;
    const sightings = await this.getSightings();
    const output = sightings.filter(
      (data) => data[filter] && data[filter].toLowerCase().includes(filterData)
    );
    res.json(output);
  };
}

module.exports = SightingsController;
