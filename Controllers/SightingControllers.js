class SightingsController {
  constructor(getSightings) {
    this.getSightings = getSightings;
  }
  getAllData = async (req, res) => {
    const sightings = await this.getSightings();
    res.json(sightings);
  };
}

module.exports = SightingsController;
