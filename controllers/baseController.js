class BaseController {
  // this constructor's model is received from the classes that extend BaseController via super(model)
  constructor(model) {
    this.model = model;
  }

  baseMethod = (req, res) => {
    // return res.send("This is my base controller");
    return res.json({
      message: "This is my base controller",
      model: `using ${this.model}`,
    });
  };

  // therefor this.model here refers to the model that's in the Class that inherited it.
  baseGetAll = async (req, res) => {
    console.log("base controller");
    try {
      const output = await this.model.findAll();
      return res.json({ success: true, data: output });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  };

  // createOne = async (req, res) => {
  //   try {
  //     const { data } = req.body; // from the request body (post request)
  //     const newOutput = await this.model.create({
  //       data,
  //     });
  //     return res.json(newOutput);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err.message });
  //   }
  // };
}

module.exports = BaseController;
