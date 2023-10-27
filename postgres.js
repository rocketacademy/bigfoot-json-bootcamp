const pg = require("pg");
const { Client } = pg;

// set the way we will connect to the server
require("dotenv").config();

const pgConnectionConfigs = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

// create the var we'll use
const client = new Client(pgConnectionConfigs);

// make the connection to the server
client.connect();

// create the query done callback
const whenQueryDone = (error, result) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log("error", error);
  } else {
    // rows key has the data
    console.log(result.rows);
  }

  // close the connection
  client.end();
};

// write the SQL query
const sqlQuery = "SELECT * FROM students";

// run the SQL query
client.query(sqlQuery, whenQueryDone);
