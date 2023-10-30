class BaseController {
  constructor({ pool, tblName }) {
    this.pool = pool;
    this.tblName = tblName;
  }

  baseMethod = (req, res) => {
    return res.send("This is my base controller");
  };

  getAll = async (req, res) => {
    const sqlQuery = `SELECT * FROM ${this.tblName};`;

    try {
      // Better way to write via async await
      const data = await this.pool.query(sqlQuery);
      return res.json({ success: true, data: data.rows });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  findById = async (req, res) => {
    const { id } = req.params;
    const sqlQuery = `SELECT * FROM ${this.tblName} WHERE id=${id};`;

    try {
      const data = await this.pool.query(sqlQuery);
      if (data.rows.length === 0) {
        return res.status(404).json({ success: false, msg: `student missing` });
      }
      return res.json({ success: true, data: data.rows });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };
}

module.exports = BaseController;
