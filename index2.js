require("dotenv").config();
const express = require("express");
const pg = require("pg");
const { Pool } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: "postgres", //sudo su postgres
  password: process.env.PASSWORD, //For laptop, no need for pc (*Personal referrence)
  host: "localhost",
  database: "postgres", //psql *
  port: 5432, // Postgres server always runs on this port
};

const pool = new Pool(pgConnectionConfigs);

const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

// Code to retireve all rows from the students table
app.get("/", (request, response) => {
  console.log("get request came in");

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log("Error executing query", error.stack);
      response.status(503).send(result.rows);
      return;
    }
    console.log(result.rows[0]);
    response.send(result.rows);
  };

  // Query using pg.Pool instead of pg.Client
  pool.query("SELECT * FROM students", whenDoneWithQuery);
});

// Code to insert a student into the students table
app.post("/", (request, response) => {
  console.log("post request came in");
  console.log(request.body); // All of the data that is being sent

  // Example body:
  // {
  // "first_name": "Johnny",
  // "last_name": "Cage",
  // "mobile": 118443,
  // "gender": true
  // }

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
    console.log(result.rows);
    response.send(result.rows);
  };

  // Query using pg.Pool instead of pg.Client
  pool.query(
    `INSERT INTO students (first_name, last_name, mobile, gender) VALUES ('${first_name}', '${last_name}', ${mobile}, ${gender})`,
    whenDoneWithQuery
  );
});

app.put("/", (request, response) => {
  console.log("put request came in");
  console.log(request.body);

  // Example body:
  // {
  // "id_field": "first_name",
  // "id_value": "Fong",
  // "field": "last_name",
  // "value": "Sub-Zero"
  // }

  let id_field = request.body.id_field;
  let id_value = request.body.id_value;
  let field = request.body.field;
  let value = request.body.value;

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log("Error executing query", error.stack);
      response.status(503).send(result.rows);
      return;
    }
    console.log(result.rows);
    response.send(result.rows);
  };

  // Query using pg.Pool instead of pg.Client
  pool.query(
    `UPDATE students SET ${field} = '${value}' WHERE ${id_field} = '${id_value}'`,
    whenDoneWithQuery
  );
});

app.delete("/", (request, response) => {
  console.log("delete request came in");
  console.log(request.body);

  // Example body:
  // {
  // "field": "id",
  // "value": 6
  // }

  let field = request.body.field;
  let value = request.body.value;
  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log("Error executing query", error.stack);
      response.status(503).send(result.rows);
      return;
    }
    console.log(result.rows);
    response.send(result.rows);
  };

  // Query using pg.Pool instead of pg.Client
  pool.query(
    `DELETE FROM students WHERE ${field} = '${value}'`,
    whenDoneWithQuery
  );
});

app.listen(3004);
