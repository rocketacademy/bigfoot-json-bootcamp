const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
    this.model = model;
  }

  // Create a new Category to Database (POST request) with model query method add
  addCategory = async (req, res) => {
    console.log("yo");
    const { name } = req.body; // from the request body (post request)

    console.log("new input category from body is: ", name);

    try {
      const newCategory = await this.model.create({
        name: name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  };

  // Edit an existing Category (PUT request)
  editCategory = async (req, res) => {
    const { categoryIndex } = req.params;

    try {
      const categoryToEdit = await this.model.findByPk(categoryIndex);
      const updatedCategory = {
        content: req.body.content,
        sighting_id: categoryToEdit.sighting_id,
      };

      await categoryToEdit.update(updatedCategory);

      return res.json({
        success: true,
        message: `category of primary index ${categoryIndex} updated`,
      });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  };
}

module.exports = CategoriesController;
