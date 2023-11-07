import React from "react";
import Select from "react-select";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BigFootInfoContext } from "../App.js";

import BACKEND_URL from "../constants.js";

export default function SightingForm() {
  const { index } = useParams();
  const { individualSighting, allCategories, getSightings, getCategories } = useContext(BigFootInfoContext);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [options, setOptions] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");

  const onInputChange = (e) => {
    if (e !== undefined) {
      let { id, value } = e.target;
      if (id === "location") {
        setLocation(value);
        console.log(location);
      } else if (id === "notes") {
        setNotes(value);
        console.log(notes);
      }
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedCategories(e);
  };

  const postRequest = async () => {
    //e.preventDefault();

    const data = {
      date: selectedDate,
      location: location,
      notes: notes,
    };

    try {
      //Create New Sighting
      const createdSighting = await axios.post(
        `${BACKEND_URL}/sightings`,
        data
      );

      if (createdSighting.data.success) {

        const associationOfCategoryAndSighting = {
          categoryId: selectedCategories.value,
          sightingsId: createdSighting.data.response.id,
        };

        //Create association after new sighting created.
        const createAssociation = await axios.put(
          `${BACKEND_URL}/categories`,
          associationOfCategoryAndSighting
        );

        if (createAssociation.data.success) {
          navigate("/sightings");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const putRequest = async () => {
    //PUT REQUEST need to edit the association table.
    //e.preventDefault();

    const data = {
      date: selectedDate,
      location: location,
      notes: notes,
    };

    try {
      const editedSighting = await axios.put(
        `${BACKEND_URL}/sightings/${index}`,
        data
      );
      if (editedSighting.data.success) {

        const associationOfCategoryAndSighting = {
          categoryId: selectedCategories.value,
          sightingsId: editedSighting.data.id,
        };

        //Create association after new sighting created.
        const createAssociation = await axios.put(
          `${BACKEND_URL}/categories`,
          associationOfCategoryAndSighting
        );

        if (createAssociation.data.success) {
          navigate("/sightings");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmitRequest = async (e) => {
    e.preventDefault();
    if (index !== undefined) {
      // Put Request 
      console.log("Enter Put");
      await putRequest();
    } else {
      // post Request
      console.log("Enter Post");
      await postRequest();
    }
  }

  const translateCategoriesToOption = () => {
    console.log(allCategories);
    let options = allCategories.map((category) => {
      return {
        value: category.id,
        label: category.weatherCategory
      };
    });
    console.log(options);
    setOptions(options);
  }

  const onHomeButtonClick = (e) => {
    navigate(`/sightings/`);
  }

  useEffect(() => {
    if (individualSighting && index !== undefined) {
      setSelectedDate(individualSighting.date);
      setLocation(individualSighting.location);
      setNotes(individualSighting.notes);

      // Get the categories info and set it to state.
      if (individualSighting.categories.length > 0) {
        setSelectedCategories(individualSighting.categories[0].weatherCategory);
      } else {
        setSelectedCategories("");
      }
    }
  }, [individualSighting])

  useEffect(() => {
    console.log(allCategories);
    if (allCategories && allCategories.length > 0) {
      translateCategoriesToOption();
    }
  }, [allCategories])

  useEffect(() => {
    // Check index, if (index !== null) then call "getSightings()" function to get sightings data
    
    if (getSightings && index !== undefined ) {
      getSightings(index);
    };

    // Call "getCategories()" to get all categories.
    if (getCategories) {
      getCategories();
    };
  }, []);

  return (
    <div>
      <div>
        <button
            name="Home"
            className="btn"
            onClick={(e) => onHomeButtonClick(e)}
          >
            Home
        </button>
      </div>
      <br />
      <h1 className="font-medium">Create New Sighting</h1>
      <form 
        onSubmit={(e) => formSubmitRequest(e)}
        className="flex flex-col justify-center text-center content-center gap-4"
      >
        {/* <Datepicker selected={selectedDate} onChange={handleDateChange} /> */}
        <label htmlFor="date"></label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          onChange={(e) => handleDateChange(e)}
          value={selectedDate}
        />
        <label htmlFor="location"></label>
        <input
          id="location"
          type="text"
          placeholder="Input the sighting location"
          onChange={(e) => onInputChange(e)}
          value={location}
          className="input input-bordered w-full"
        />
        <input
          id="notes"
          type="text"
          placeholder="Input any notes"
          onChange={(e) => onInputChange(e)}
          value={notes}
          className="input input-bordered w-full"
        />

        {/* Put Select Categories Here */}
        <Select
          options={options}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
        <input className="btn btn-ghost text-slate-400" type="submit" />
      </form>
    </div>
  );
}
