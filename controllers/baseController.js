class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    try {
      let whereConditions = {};

      // Filtering logic
      for (let key in req.query) {
        if (key !== "sortBy" && key !== "order") {
          whereConditions[key] = req.query[key];
        }
      }

      let orderConditions = [];
      if (req.query.sortBy) {
        const order = req.query.order || "asc"; // default to ascending
        orderConditions.push([req.query.sortBy, order]);
      }

      const records = await this.model.findAll({
        where: whereConditions,
        order: orderConditions,
      });

      res.json(records);
    } catch (error) {
      res
        .status(400)
        .json({ message: `Error fetching records`, error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const record = await this.model.findByPk(req.params.id);

      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      res.json(record);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error fetching record", error: error.message });
    }
  }

  async createOne(req, res) {
    try {
      const newRecord = await this.model.create(req.body);
      res.status(201).json(newRecord);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating record", error: error.message });
    }
  }
}

module.exports = BaseController;
