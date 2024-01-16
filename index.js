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
  const filters = req.query
  const filteredSightings = sightings.filter(sighting =>{
    let isValid = true
    for (let key in filters){
      console.log(key, sighting[key], filters[key])
      isValid = isValid && sighting[key] ==filters[key]
    }
    return isValid
  })
  res.send(filteredSightings)
})
// do i have to declare this all the time i want to use it because it's a promise? can i make this a global variable?
//https://www.geeksforgeeks.org/how-to-implement-search-and-filtering-in-a-rest-api-with-node-js-and-express-js/

//get all sightings list
app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
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
