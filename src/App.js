import { useState, useEffect, createContext }from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import BACKEND_URL from "./constants.js";
import Root from "./components/root.js";
import BigFoot from "./components/bigFoot.js";
import BigFootIndividual from "./components/bigFootIndividual.js";
import SightingForm from "./components/sightingForm.js";
//import EditSightings from "../components/editSightings.js";
import ErrorPage from "./error-page.js";

export const BigFootInfoContext = createContext();

const App = () => {
  const [ allsightings, setAllSightings ] = useState("");
  const [ individualSighting, setIndividualSighting ] = useState("");
  const [ allCategories, setAllCategories ] = useState("");

  const getSightings = async (index) => {
    try {
      if (index) {
        //GET - individual data
        console.log("Index: " + index);
        let individualSightings = await axios.get(`${BACKEND_URL}/sightings/${index}`);
        console.log(individualSightings);
        if (individualSightings.data.success) {
          console.log(individualSightings.data.response);
          setIndividualSighting(individualSightings.data.response);
        }
      } else {
        //GET - all data
        console.log("No index");
        let allSightings = await axios.get(`${BACKEND_URL}/sightings`);
        if (allSightings.data.success) {
          setAllSightings(allSightings.data.response);
        }
      };
    } catch (err) {
      console.log(err);
    };
  };

  const getCategories = async () => {
    try {
      let allCategories = await axios.get(`${BACKEND_URL}/categories`);
      //let parsedAllCategories = JSON.parse(allCategories);
      if (allCategories.data.success) {
        //return allCategories.data;
        setAllCategories(allCategories.data.response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const infoToPass = {
    allsightings,
    individualSighting,
    allCategories,
    getSightings,
    getCategories,
  }

  return (
    <BigFootInfoContext.Provider value={infoToPass}>
      <Routes>
        <Route 
          path="/sightings"
          element={<Root/>}
          errorElement={<ErrorPage/>}
        >
          <Route
            path=""
            element={<BigFoot/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/sightings/new"
            element={<SightingForm/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/sightings/:index"
            element={<BigFootIndividual/>}
            errorElement={<ErrorPage/>}
          />
          <Route
            path="/sightings/:index/edit"
            element={<SightingForm/>}
            errorElement={<ErrorPage/>}
          />
        </Route>
      </Routes>
    </BigFootInfoContext.Provider>
  )
}

// class App extends React.Component {

//   //1) Render only Simple info on the home page
//   //2) Then, for each info, shows full data when clicked in a new page.
//   render() {
//     return (
//       // <div className="App">
//       //   <header className="App-header">
//       //     <img src={logo} className="App-logo" alt="logo" />
//       //   </header>
//       // </div>

//       <Routes>
//         <Route 
//           path='/sightings'
//           element={<BigFoot/>}

//         >
//         </Route>
//         <Route
//           path='*'
//           element={<ErrorPage/>}
//         >

//         </Route>
//       </Routes>
//     );
//   }
// }

export default App;
