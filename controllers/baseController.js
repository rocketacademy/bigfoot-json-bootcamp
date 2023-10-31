class BaseController {
  constructor() {}

  baseMethod = (req, res) => {
    return res.send("This is my base controller");
  };
}

module.exports = BaseController;
