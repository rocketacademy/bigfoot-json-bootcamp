const BaseController = require("./baseController.js");
// const axios = require("axios");

class SightingIndexController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  getSighting = async (req, res) => {
    console.log("i am in sighting controller");
    const { sightingIndex } = req.params;

    // Find by Primary Key, a Sequelize Model Query method.
    const output = await this.model.findByPk(sightingIndex);
    if (!output) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }
    return res.json({ success: true, data: output });
  };

  // Creating a new row in the sightings table (new model) (Note that there is no Comments)
  createSighting = async (req, res) => {
    console.log("createOne");
    const { date, location, notes } = req.body;

    if (!date || !location || !notes) {
      return res.status(400).json({ success: false, msg: "Input error!" });
    }

    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });
      return res.json({ success: true, sighting: newSighting });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  };

  associateCategoryToSighting = async (req, res) => {
    const { sightingId, categoryId } = req.body;
    console.log("yay");
    const sighting = await this.model.findByPk(sightingId);
    const category = await this.categoryModel.findByPk(categoryId);

    await sighting.setCategories(category);

    return res.json({ success: true, sighting, category });
  };

  deleteComment = async (req, res) => {
    const { commentIndex } = req.params;
    // console.log("the comment Index is: ", commentIndex);
    try {
      const commentToBeDeleted = await this.commentModel.findByPk(commentIndex);
      await commentToBeDeleted.destroy();
      // await commentToBeDeleted.destroy({where:{id:commentIndex}});

      return res.json({
        success: true,
        message: `comment of ${commentIndex} deleted`,
      });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  };

  editComment = async (req, res) => {
    const { commentIndex } = req.params;

    try {
      const commentToEdit = await this.commentModel.findByPk(commentIndex);
      // console.log("the sighting id is: ", commentToEdit.sighting_id);
      const updatedComment = {
        content: req.body.content,
        sighting_id: commentToEdit.sighting_id,
      };

      await commentToEdit.update(updatedComment);

      return res.json({
        success: true,
        message: `comment of ${commentIndex} updated`,
      });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  };

  // Add a new row in the comments table (new model)
  addComment = async (req, res) => {
    console.log("yo");
    const { sightingIndex } = req.params; // from the URL (post request)
    const { content, sightingsID } = req.body; // from the request body (post request)

    console.log("req params from URL is: ", sightingIndex);
    console.log("sightingsID from body is: ", sightingsID);

    /**Foong's Method -  Lazy Loading -
     * Does not require the secondary table's model to be passed in at root index.js level */
    // try {
    //   const sighting = await this.model.findByPk(sightingIndex);
    //   // Using a method, create<SecondaryTable> ,
    //   //that is automatically created by Sequelize. Not sure what line of code completes this creation
    //   const newComment = await sighting.createComment({
    //     content,
    //     sightingsId: sightingIndex,
    //   });
    //   return res.json(newComment);
    // } catch (err) {
    //   return res.status(400).json({ error: true, msg: err.message });
    // }

    // extrapolated idea
    /**Eager Loading -
     * Does not require the secondary table's model to be passed in at root index.js level */
    // try {
    //   const sighting = await this.model.findByPk(sightingIndex);
    //   // return res.json(sighting);
    //   const newComment = await sighting.create({
    //     content: content,
    //     //     sighting_id: sightingIndex,
    //   });
    //   return res.json(newComment);
    // } catch (err) {
    //   return res.status(400).json({ error: true, msg: err.message });
    // }

    /**Example Method - Eager Method -
     * Requires the secondary table's model to be passed in at root index.js level
     */
    try {
      const newComment = await this.commentModel.create({
        content: content,
        // Q: Having difficulty understanding this sightingsId. sightingsId, sightingsID, sighting_id
        sighting_id: sightingIndex,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = SightingIndexController;
