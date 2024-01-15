const express = require('express')
const { getSightings } = require('./utils.js')
const cors = require('cors')
require('dotenv').config()


const PORT = process.env.PORT;
const app = express();

//cors middleware
app.use(cors())

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingsIndex", async(req,res)=>{
  const sightings = await getSightings()
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
