import {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {BigFootInfoContext} from "../App.js"
import axios from "axios";

import BACKEND_URL from "../constants.js";

export default function BigFootIndividual() {
    let { index } = useParams();
    const navigate = useNavigate();
    const { individualSighting, getSightings } = useContext(BigFootInfoContext);
    const [ individualSightingData, setindividualSightingData ] = useState("");
    const [ comments, setComments ] = useState([]);
    //const [ mappedComments, setMappedComments ] = useState("");
    const [ commentText, setCommentText ] = useState("");

    const renderIndividual = () => {
      if (individualSighting && Object.keys(individualSighting).length > 0 && index) {
        setindividualSightingData(
          <>
            <br />
            <table className="table table-zebra">
              <tbody>
                <tr>
                  <th>Individual Sighting</th>
                  <td>
                    <button
                      id={index}
                      className="btn"
                      onClick={(e) => onEditSightingClick(e)}
                    >
                      Edit Sighting
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{individualSighting.date}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>{individualSighting.location}</td>
                </tr>
                <tr>
                  <th>Notes</th>
                  <td>{individualSighting.notes}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>
                    {individualSighting.categories.length > 0
                      ? individualSighting.categories[0].weatherCategory
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        );
      };
    }

    const renderComments = () => {
      if (comments && comments.length > 0) {
        return comments.map((comment) => {
          return (
            <div key={comment.id}>
              <div className="flex justify-between text-center content-center">
                <div>
                  {comment.sightingComment}
                </div>
                <div>
                  {/* <button
                    id={comment.id}
                    className="btn btn-xs"
                    onClick={(e) => onCommentEditButtonClick(e)}
                  >
                    Edit
                  </button> */}
                  <button
                    id={comment.id}
                    className="btn btn-xs"
                    onClick={(e) => onCommentDeleteButtonClick(e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        }); 
      };
    }

    const onCommentBoxChange = (e) => {
      if (e !== undefined) {
        let { name, value } = e.target;
        if (name === "commentText") {
          setCommentText(value);
        }
        console.log(commentText);
      }
    };

    const onCommentButtonSubmit = async (e) => {
      e.preventDefault();
      try {
        let commentObjDetails = { sightingComment: commentText };
  
        console.log(index);
        console.log(commentObjDetails);
        let newComment = await requestToBackendForComments({
          index,
          reqMethod: "post",
          commentObjDetails,
        });
  
        if (newComment) {
          console.log(newComment);
          comments.push(newComment);
          setComments(comments);
          setCommentText("");
        }
      } catch (err) {
        console.log(err);
      };
    };

    const onCommentEditButtonClick = async (e) => {
      //NEED TO FILL IN
      //Turn comment box into editable box with submit & cancel button beside. 
    }
    
    const onCommentDeleteButtonClick = async (e) => {
      e.preventDefault();
      try {
        const { id } = e.target;
        console.log(id);
        console.log(index);
        let commentObjDetails = { commentId: id };
  
        let deletedCommentId = await requestToBackendForComments({
          index,
          reqMethod: "delete",
          commentObjDetails,
        });
  
        if (deletedCommentId) {
          let filteredComments = comments.filter(
            (comment) => comment.id !== parseInt(deletedCommentId)
          );
          console.log(filteredComments);
          setComments(filteredComments);
        }
      } catch (err) {
        console.log(err);
      };
    };

    const onHomeButtonClick = (e) => {
      navigate(`/sightings/`);
    }

    const onEditSightingClick = (e) => {
      navigate(`/sightings/${index}/edit`);
    }

    const requestToBackendForComments = async ({ index, reqMethod, commentObjDetails}) => {
      try {
        if (index) {
          switch (reqMethod) {
            default:
              break;

            case "get":
              let allComments = await axios.get(`${BACKEND_URL}/sightings/${index}/comments`);
              if (allComments.data.success) {
                return allComments.data.response;
              }
              break;

            case "post":
              let newInputComment = await axios.post(`${BACKEND_URL}/sightings/${index}/comments`, commentObjDetails);
              if (newInputComment.data.success) {
                return newInputComment.data.response;
                // add on to the comment array.
              }
              break;

            case "put":
              let editedComment = await axios.put(`${BACKEND_URL}/sightings/${index}/comments`, commentObjDetails);
              if (editedComment.data.success) {
                return editedComment.data.response;
                // To search and edit the comment inside the array.
              }
              break;

            case "delete":
              let deletedComment = await axios.delete(`${BACKEND_URL}/sightings/${index}/comments`, {data: commentObjDetails});
              if (deletedComment.data.success) {
                return deletedComment.data.response;
                //To search and delete the comment inside the array.
              }
              break;
          };
        };
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      if (individualSighting && Object.keys(individualSighting).length > 0) {
        renderIndividual();
      }
    }, [individualSighting])

    useEffect(() => {
      renderComments();
    }, [comments])

    useEffect(() => {
      if (getSightings) {
        getSightings(index);
      };

      async function fetchDataForComments() {
        try {
          if (index) {
            let returnedComments =  await requestToBackendForComments ({index, reqMethod: "get"});
            // if (returnedComments) {
            //   let mappedData = renderComments(returnedComments)
            //   setComments(mappedData);
            // };
            setComments(returnedComments);
          };
        } catch (err) {
          console.log(err);
        };
      };
      fetchDataForComments();
    }, []);

    return (
      <>
        <div className="text-center">
          <button
              name="Home"
              className="btn"
              onClick={(e) => onHomeButtonClick(e)}
            >
              Home
          </button>
        </div>
        <div className="overflow-x-auto">
          {individualSightingData}
        </div>
        <br />
        <div>
          <h4 className="font-medium text-center">Comments</h4>
          <div className="card w-auto bg-base-100 text-sm">
            <div className="card-body px-2">
              {/* Comments Area */}
              {renderComments()}

              {/* Input Area */}
              <div>
                <form
                  onSubmit={(e) => onCommentButtonSubmit(e)}
                  className="flex items-center justify-between"
                >
                  <input
                    name="commentText"
                    id={index}
                    type="text"
                    placeholder="Add a comment..."
                    onChange={(e) => onCommentBoxChange(e)}
                    value={commentText}
                    className="input input-sm w-full max-w-xs"
                  />
                  <input
                    className=" btn btn-ghost btn-sm text-slate-400"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}