const express = require('express')
const cors = require('cors')
const { getSightings } = require('./utils.js')
require('dotenv').config()

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin:'http://localhost:3000',
  optionsSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get("/sightings", async (req, res) => {
  const sightingFilter = req.query; //object containing filter keys and filter values from the searchParams
  //sightingQuery
  const sightings = await getSightings();
  sightings.forEach((sighting,index)=>sighting.INDEX = index);
  console.log(sightings)
  const filteredSightings = sightings.filter((sighting) => { // filters sightings
    return Object.keys(sightingFilter).reduce((acc, key) => {
      if (key.includes('sort')) {
        return acc && true;
      }else if (key.toUpperCase() in sighting) { // check if field exists in sighting; filter out sort keys
        return acc && sighting[key.toUpperCase()].includes(sightingFilter[key]) // if so check if field includes the filter value
      } else { // if field does not exist in sighting, return false 
        return false
      }
    }, true)
  })
  filteredSightings.sort((a, b)=>{
    const firstValue = a[sightingFilter.sortBy.toUpperCase()];
    const secondValue = b[sightingFilter.sortBy.toUpperCase()];
    if (sightingFilter.sortOrder === 'Descending') {
      return (firstValue < secondValue) ? -1 : (firstValue > secondValue) ? 1 : 0;
    } else if (sightingFilter.sortOrder === 'Ascending') {
      return (firstValue > secondValue) ? -1 : (firstValue < secondValue) ? 1 : 0;
    }   
  })
    
  res.json(filteredSightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const {sightingIndex} = req.params
  const sightings = await getSightings();
  res.json(sightings[sightingIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
