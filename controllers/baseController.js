class BaseController {
  // this constructor's model is received from the classes that extend BaseController via super(model)
  constructor(model) {
    this.model = model;
  }

  baseMethod = (req, res) => {
    return res.send("This is my base controller");
  };

  // therefor this.model here refers to the model that's in the Class that inherited it.
  getAll = async (req, res) => {
    const output = await this.model.findAll();
    return res.json({ success: true, data: output });
  };

  // createOne = async (req, res) => {
  //   console.log("createOne");
  //   const { date, location, notes } = req.body;

  //   if (!date || !location || !notes) {
  //     return res.status(400).json({ success: false, msg: "Input error!" });
  //   }

  //   try {
  //     const newSighting = await this.model.create({
  //       date,
  //       location,
  //       notes,
  //     });
  //     return res.josn({ success: true, sighting: newSighting });
  //   } catch (err) {
  //     return res.status(400).json({ success: false, msg: err });
  //   }
  // };
}

module.exports = BaseController;
