const express = require("express");
const app = express();

const cors = require("cors");

const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  //this console.log is not showing up
  console.log("AAAA i am a backend sightings variable", sightings);
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  console.log("req.params:", req.params);
  let requested_index_of_data = req.params.sightingIndex;
  console.log("requested_index_of_data: ", requested_index_of_data);
  console.log(
    "sightings[requested_index_of_data] :",
    sightings[requested_index_of_data]
  );
  res.json(sightings[requested_index_of_data]);
});

//http://localhost:8080/user/Bill - bill is the query
// app.get("/user/:name", (req, res) => {
//   res.send(`Hello ${req.params.name}`);
// });

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
