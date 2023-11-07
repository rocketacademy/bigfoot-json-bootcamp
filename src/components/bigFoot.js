import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BigFootInfoContext } from "../App.js"

export default function BigFoot() {
    const { allsightings, getSightings } = useContext(BigFootInfoContext);
    const navigate = useNavigate();
    const [ sightingsRow, setsightingsRow ] = useState([]);

    const renderTableRow = () => {
      if (allsightings && allsightings.length > 0) {
        let mappedData = allsightings.map((item) => {
          return (
            <tr
              key={item.id}
              className="cursor-pointer"
              //Need to check whether does the function exist?
              onClick={() => onSightingIndexClick(item.id)}
            >
              {/* FOR BIGFOOT SQL */}
              <td>{item.date}</td>
              <td>{item.location}</td>
              <td>
                {item.categories.length > 0 ? item.categories[0].weatherCategory : ""}
              </td>
              {/* FOR BIGFOOT JSON
              <th>{item.YEAR}</th>
              <td>{item.SEASON}</td>
              <td>{item.MONTH ? item.MONTH : ""}</td> */}
            </tr>
          );
        });
        setsightingsRow(mappedData);
      } else {
        <p>No data here</p>
      }
    }

    const onSightingIndexClick = async (id) => {
      console.log(id);
      navigate(`/sightings/${id}`);
    }

    const createNewSighting = (e) => {
      navigate(`/sightings/new`);
    }

    useEffect(() => {
      if (allsightings && allsightings.length > 0) {
        renderTableRow();
      }
    }, [allsightings])

    useEffect(() => {
      if (getSightings) {
        getSightings();
      };
    }, []);

    return (
      <>
      <div>
        <button
            name="createSighting"
            className="btn"
            onClick={(e) => createNewSighting(e)}
          >
            New Sighting
        </button>
      </div>
      <br />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
          {sightingsRow}
          </tbody>
        </table>
      </div>
      </>
    );
}