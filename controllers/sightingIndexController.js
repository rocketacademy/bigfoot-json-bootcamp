const BaseController = require("./baseController.js");
// const axios = require("axios");

class SightingIndexController extends BaseController {
  constructor(model) {
    super(model);
  }

  test = (req, res) => {
    return res.send("I am in my Sighting Controller");
  };

  addOne = async (req, res) => {};

  getSighting = async (req, res) => {
    console.log("req params is: ", req.params);
    const { sightingID } = req.params;
    // console.log("the model is: ", this.model); // This is undefined. Why???

    // Find by Primary Key, a Sequelize Model Query method.
    console.log("i am in sighting controller");
    const output = await this.model.findByPk(sightingID);
    if (!output) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }
    return res.json({ success: true, data: output });
  };
}

module.exports = SightingIndexController;

// getSighting = async (req, res) => {
//   console.log("req params is: ", req.params);
//   const { sightingID } = req.params;
//   // console.log("the model is: ", this.model); // This is undefined. Why???

//   // Find by Primary Key, a Sequelize Model Query method.

//   console.log("try");
//   const output = await this.model.findByPk(sightingID);
//   console.log("done");
//   if (!output) {
//     return res.status(404).json({ success: false, msg: "User not found." });
//   }
//   return res.json({ success: true, data: output });

// try {
//   console.log("try");
//   const output = await this.model.findByPk(sightingID);
//   console.log("done");
//   if (!output) {
//     return res.status(404).json({ success: false, msg: "User not found." });
//   }
//   return res.json({ success: true, data: output });
// } catch (err) {
//   return res.status(404).json({ success: false, msg: err });
// }
// };

// createOne = async (req, res) => {
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
