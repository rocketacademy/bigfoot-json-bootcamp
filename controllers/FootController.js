class FootController {
  constructor() {
    this.footArray = ["Bigfoot", "Smallfoot", "Midfoot"];
  }

  list = (req, res) => {
    res.send({ foot: this.footArray });
  };
}

module.exports = FootController;
