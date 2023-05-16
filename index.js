const express = require("express");
const cors = require("cors");
const { getSightings } = require("./utils.js");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

app.get("/links", async (req, res) => {
  let { filter } = req.query;
  const links = [];
  let sightings = await getSightings();

  if (!filter) {
    filter = "";
  }

  sightings.map((value, index) => {
    if (value.SEASON) {
      if (value.SEASON.includes(filter)) {
        const link = {
          INDEX: index,
          REPORT_NUMBER: value.REPORT_NUMBER,
          YEAR: value.YEAR,
          MONTH: value.MONTH,
        };
        links.push(link);
      }
    }
  });
  return res.json(links);
});

app.get("/sightings/:id", async (req, res) => {
  const sightings = await getSightings();
  const { id } = req.params;
  const data = sightings[id];
  return res.json(data);
});

app.listen(PORT, () => {
  console.log(`Express listening on PORT:${PORT}`);
});
