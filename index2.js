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
  //database: "db01", //psql*
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
      console.log("Error executing get query", error.stack);
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

  // Validate input
  if (!first_name || !last_name || !mobile || !gender) {
    // If any required field is missing or gender is not a boolean, return an error response.
    console.log("No input received for one or more of the field.");
    response.status(400).send("Missing input");
    return;
  }
  // Check if first_name and last_name contain only alphanumeric characters
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (
    !alphanumericRegex.test(first_name) ||
    !alphanumericRegex.test(last_name)
  ) {
    console.log("First name or last name contains invalid characters.");
    response
      .status(400)
      .send("First name or last name contains invalid characters.");
    return;
  }
  if (!Number.isInteger(mobile)) {
    console.log("Invalid input for mobile.");
    response.status(400).send("Invalid input for mobile.");
    return;
  }
  if (typeof gender !== "boolean") {
    console.log("Invalid input for gender. Only true or false is accepted");
    response
      .status(400)
      .send("Invalid input for gender. Only true or false is accepted.");
    return;
  }

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log("Error executing post", error.stack);
      response.status(503).send(result);
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

  // Validate input
  if (!id_field || !id_value || !field || !value) {
    // If any required field is missing or gender is not a boolean, return an error response.
    console.log("No input received for one or more of the field.");
    response.status(400).send("Missing input");
    return;
  }
  // Check if first_name and last_name contain only alphanumeric characters
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  switch (field) {
    case "id" || "mobile":
      if (!Number.isInteger(value)) {
        console.log("Invalid input. Input must be numeric");
        response.status(400).send("Invalid input. Input must be numeric.");
        return;
      }
      break;
    case "first_name" || "last_name":
      if (!alphanumericRegex.test(value)) {
        console.log("Invalid characters. Name must be alphanumeric.");
        response
          .status(400)
          .send("Invalid characters. Name must be alphanumeric.");
        return;
      }
      break;
    case "gender":
      if (typeof gender !== "boolean") {
        console.log("Invalid input for gender. Only true or false is accepted");
        response
          .status(400)
          .send("Invalid input for gender. Only true or false is accepted.");
        return;
      }
      break;

    default:
      break;
  }

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log("Error executing put", error.stack);
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
      console.log("Error executing delete", error.stack);
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
