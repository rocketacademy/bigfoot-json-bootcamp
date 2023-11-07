import React from "react";
import Select from "react-select";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BigFootInfoContext } from "../src/App.js";

import BACKEND_URL from "./constants.js";

export default function EditSightings(props) {
  let { index } = useParams();
  const { bigFootInfoContext } = useContext(BigFootInfoContext);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [allCategories, setAllCategories] = useState("");
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
    setSelectedDate(e);
  };

  const handleSelectChange = (e) => {
    let { value, label } = e.target;
    setSelectedCategories(value);
  };

  const putRequest = async (e) => {
    e.preventDefault();

    const data = {
      date: selectedDate,
      location: location,
      notes: notes,
    };

    try {
      const createdSighting = await axios.put(
        `${BACKEND_URL}/sightings/${index}`,
        JSON.stringify(data)
      );
      if (createdSighting.success) {
        navigate("/sightings");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const translateCategoriesToOption = () => {
    let options = allCategories.map((category) => {
      return {
        value: category.id,
        label: category.weatherCategory
      };
    })
    setOptions(options);
  }

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      translateCategoriesToOption();
    }
  }, [allCategories])

  useEffect(() => {
    if (bigFootInfoContext) {
      let returnedBigFootData = bigFootInfoContext.getSightings(index);
      if (returnedBigFootData) {
        setSelectedDate(returnedBigFootData.data.date);
        setLocation(returnedBigFootData.data.location);
        setNotes(returnedBigFootData.data.notes);
      }
      // Get the categories info and set it to state.
      if (returnedBigFootData.categories.length > 0) {
        setSelectedCategories(returnedBigFootData.categories[0].weatherCategory);
      };
    };

    // Call "getCategories()" to get all categories.
    if (bigFootInfoContext) {
      let returnedCategoriesData = bigFootInfoContext.getCategories();
      if (returnedCategoriesData) {
        setAllCategories(returnedCategoriesData);
      };
    };
  }, []);

  return (
    <div>
      <h1>Edit Sighting</h1>
      <form onSubmit={(e) => putRequest(e)}>
        <label htmlFor="date">Date</label>
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
            className="input input-bordered w-full max-w-xs"
        />
        <input
            id="notes"
            type="text"
            placeholder="Input any notes"
            onChange={(e) => onInputChange(e)}
            value={location}
            className="input input-bordered w-full max-w-xs"
        />

        {/* Put Select Categories Here */}
        <Select
          options={options}
          value={selectedCategories}
          onChange={handleSelectChange}
        />

        <input className="btn btn-ghost btn-xs text-slate-400" type="submit" />
      </form>
    </div>
  );
}
