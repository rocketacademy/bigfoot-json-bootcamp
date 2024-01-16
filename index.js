const express = require('express')
const { getSightings } = require('./utils.js')
const cors = require('cors')
require('dotenv').config()


const PORT = process.env.PORT;
const app = express();

//cors middleware
app.use(cors())

//get filtered results by YEAR. 
app.get("/sightings/filter", async(req,res)=>{
  const sightings = await getSightings()
  const { YEAR, SEASON, MONTH, STATE, COUNTY  } = req.query
  console.log(YEAR)
  let filterSightings = sightings.filter((sighting)=>sighting.YEAR == YEAR)
  res.send(filterSightings)
})

//get all sightings list
app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  // console.log(sightings[1].YEAR)
  res.json(sightings);
});

//get specific sighting
app.get("/sightings/:sightingsIndex", async(req,res)=>{
  const sightings = await getSightings()
  res.send(sightings[req.params.sightingsIndex])
})


app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
