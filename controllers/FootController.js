const BaseController = require("./baseController");

class FootController extends BaseController {
  constructor({ pool, tblName }) {
    super({ pool, tblName });
  }

  // getAll = (req, res) => {
  //   const whenDoneWithQuery = (error, result) => {
  //     if (error) {
  //       console.log("Error executing query", error.stack);
  //       res.status(503).send("Error executing query");
  //       return;
  //     }
  //     console.log(result.rows[0].name);
  //     res.send(result.rows);
  //   };

  //   const sqlQuery = `SELECT * FROM ${this.tblName};`;
  //   this.pool.query(sqlQuery, whenDoneWithQuery);
  // };
}

module.exports = FootController;
