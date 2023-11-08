const BaseController = require("./baseController.js");
// const axios = require("axios");

class SightingIndexController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  getSighting = async (req, res) => {
    const { sightingIndex } = req.params;

    // Find by Primary Key, a Sequelize Model Query method.
    try {
      const output = await this.model.findByPk(sightingIndex);
      if (!output) {
        return res.status(404).json({ success: false, msg: "User not found." });
      }
      return res.json({ success: true, data: output });
    } catch (err) {
      return res.status(404).json({ success: false, data: "No Id." });
    }
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
    console.log("the ids are: ", sightingId, categoryId);
    console.log("yay");
    const sighting = await this.model.findByPk(sightingId);
    const category = await this.categoryModel.findByPk(categoryId);

    console.log("added category: ", category);

    await sighting.addCategories(category);

    return res.json({ success: true, data: category });
  };

  getAssignedCategories = async (req, res) => {
    const { sightingIndex } = req.params;
    console.log("assigned categories of: ", sightingIndex);

    const sighting = await this.model.findByPk(sightingIndex);
    // Sequelize generated Method getCategories
    const associatedCategories = await sighting.getCategories();

    return res.json({ success: true, data: associatedCategories });
  };

  removeAssignedCategory = async (req, res) => {
    const { sightingId, categoryId } = req.body;

    const sighting = await this.model.findByPk(sightingId);
    const category = await this.categoryModel.findByPk(categoryId);
    await sighting.removeCategory(category);

    return res.json({ success: true, removed: category });
  };

  getAllComments = async (req, res) => {
    const { sightingIndex } = req.params;
    try {
      const allComments = await this.commentModel.findAll({
        where: { sighting_id: sightingIndex },
      });
      return res.json({ success: true, data: allComments });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  };

  deleteComment = async (req, res) => {
    const { commentIndex } = req.params;
    // console.log("the comment Index is: ", commentIndex);
    try {
      const commentToBeDeleted = await this.commentModel.findByPk(commentIndex);
      await commentToBeDeleted.destroy();

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

    // console.log("req params from URL is: ", sightingIndex);
    // console.log("sightingsID from body is: ", sightingsID);

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
      return res.json({ data: newComment });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };
}

module.exports = SightingIndexController;
