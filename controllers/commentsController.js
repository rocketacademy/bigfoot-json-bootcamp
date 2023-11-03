class CommentsController {
  constructor(model) {
    this.model = model;
  }

  // Add a new row in the comments table (new model)
  addComment = async (req, res) => {
    const { sightingIndex } = req.params; // from the URL (post request)
    const { content, SightingID } = req.body; // from the request body (post request)

    if (!content || !SightingID) {
      return res.status(400).json({ success: false, msg: "Input error!" });
    }

    try {
      const newContent = await this.model.create({
        content,
        SightingID,
      });
      return res.json({
        success: true,
        msg: `comment added for ${sightingID}`,
        content: newContent,
      });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err.message });
    }
  };
}

module.exports = CommentsController;
