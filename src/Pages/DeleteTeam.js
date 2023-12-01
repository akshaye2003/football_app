import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

function DeleteTeam() {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const teamName = e.target.team.value;
    axios
      .get(`http://localhost:5000/football/team/get/${teamName}`)
      .then((res) => {
        setIsLoading(false);
        if (res.data.success) {
          setTeams(res.data.result);
        }
      })
      .catch((res) => {
        showAlert("danger");
      });
  };

  const showAlert = (type) => {
    setAlertType(type);
    if (type === "success") {
      setMessage("Team updated successfully");
    } else {
      setMessage("Something went wrong");
    }
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="d-flex justify-content-center">
        <form
          className="row g-3 ms-5 mt-2"
          style={{ width: "55%" }}
          onSubmit={handleSearchSubmit}
        >
          <div className="col-6 w-75 ">
            <label htmlFor="team" className="form-label">
              Search team
            </label>
            <input type="text" className="form-control" id="team" />
          </div>

          <div className="col-6 d-flex justify-content-center mt-5 w-25 mb-1">
            <button
              type="submit"
              className="btn btn-success w-50"
              style={{ height: 40 }}
            >
              {isLoading ? (
                <ClipLoader loading={isLoading} color="white" size={18} />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <table className="table table-hover" style={{ width: "60%" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team</th>
              <th scope="col">Played</th>
              <th scope="col">Won</th>
              <th scope="col">Draw</th>
              <th scope="col">Lost</th>
              <th scope="col">Goals for</th>
              <th scope="col">Goals against</th>
              <th scope="col">Points</th>
              <th scope="col">Year</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((ele, ind) => {
              return (
                <tr>
                  <th scope="row" key={ind}>
                    {" "}
                    {ind + 1}{" "}
                  </th>
                  <td> {ele.team} </td>
                  <td> {ele.gamesPlayed} </td>
                  <td> {ele.win} </td>
                  <td> {ele.draw} </td>
                  <td> {ele.loss} </td>
                  <td> {ele.goalsFor} </td>
                  <td> {ele.goalsAgainst} </td>
                  <td> {ele.points} </td>
                  <td> {ele.year} </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={(e) => {}}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "black" }}
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeleteTeam;
