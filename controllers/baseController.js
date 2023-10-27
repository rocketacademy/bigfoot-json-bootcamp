class BaseController {
  constructor({ pool, tblName }) {
    this.pool = pool;
    this.tblName = tblName;
  }

  baseMethod = (req, res) => {
    return res.send("This is my base controller");
  };

  getAll = (req, res) => {
    const whenDoneWithQuery = (error, result) => {
      if (error) {
        console.log("Error executing query", error.stack);
        res.status(503).send("Error executing query");
        return;
      }
      console.log(result.rows[0].name);
      res.send(result.rows);
    };

    const sqlQuery = "SELECT * FROM students;";
    this.pool.query(sqlQuery, whenDoneWithQuery);
  };

  findById = (req, res) => {
    const { id } = req.params;
  };
}

module.exports = BaseController;
