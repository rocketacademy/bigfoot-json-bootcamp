const express = require("express");
const pg = require("pg");
const { Pool } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: "postgres", //sudo su postgres
  host: "localhost",
  database: "db01", //psql*
  port: 5432, // Postgres server always runs on this port
};

// create the var we'll use
const pool = new Pool(pgConnectionConfigs);

const app = express();

// Code to retireve all rows from the students table
app.get("/", (request, response) => {
  console.log("request came in");

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log("Error executing query", error.stack);
      response.status(503).send(result.rows);
      return;
    }
    console.log(result.rows[0].name);
    response.send(result.rows);
  };

  // Query using pg.Pool instead of pg.Client
  pool.query("SELECT * FROM students", whenDoneWithQuery);
});

// Code to insert a student into the students table
app.post("/", (request, response) => {
  console.log("request came in");
  //console.log(request.body);

  let first_name = request.body.first_name;
  let last_name = request.body.last_name;
  let mobile = request.body.mobile;
  let gender = request.body.gender;

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log("Error executing query", error.stack);
      response.status(503).send(result.rows);
      return;
    }
    //console.log(result.rows);
    response.send(result.rows);
  };

  // Query using pg.Pool instead of pg.Client
  pool.query(
    `INSERT INTO students (first_name, last_name, mobile, gender) VALUES ('${first_name}', '${last_name}', ${mobile}, ${gender})`,
    whenDoneWithQuery
  );
});

app.listen(3004);
