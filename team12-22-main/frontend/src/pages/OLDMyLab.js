import React, { useState, useEffect } from "react";
import { postData } from "../api/PostRequest.js";
import { getCookie } from "../api/CSRFCookie.js";
import TopHeader from "../component/TopHeader/index.js";
import LoggedInGuard from "../api/LoggedInGuard";

const API_URL = process.env.REACT_APP_API_BASE_URL;

function MyModels() {
  const [models, setModels] = useState([]);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(0);

  LoggedInGuard('/login', false);

  useEffect(() => {
    async function fetchModels() {
      fetch(`${API_URL}api/my-models/`)
      .then((response) => response.json())
      .then((data)=>{
        console.log(data);
        setModels(data)
      });
      }
    fetchModels();
  }, []);

  const makePredictions = async (nnId) => {
    postData(JSON.stringify({ nnId }), "api/make-predictions/")
      .then((response) => response.json())
      .then((data) => {
        // handle csv data
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("dataset", file);
    const token = getCookie("csrftoken");
    //alert("got the token" + token);
    fetch(`${API_URL}api/upload_dataset/`, {
      headers: {
        "X-CSRFToken": token,
      },
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          // the user has logged in
          alert("Success " + res.details);
        } else {
          alert(res.details);
        }
      });
  };

  return (
    <div>
    <TopHeader />
      <h2 className="my-4">My Lab</h2>
      <div className="fontSize MyModels">
        <h2>All your models in one place</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Name</th>
              <th>Type</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id}>
                <td>{model.id}</td>
                <td>{model.desc}</td>
                <td>{model.name}</td>
                <td>{model.type}</td>
                <td>{model.perf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="prediction">
        <p>Select a model to make predictions:</p>
        <div className="row">
          {models.map((nn) => (
            <div className="col-md-4" key={nn.id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{nn.name}</h5>
                  <p className="card-text">
                    Neural Network ID: {nn.id}
                    <br />
                    Performance Metrics: {nn.perf.join(", ")}
                    <br />
                  </p>
                  <button
                    onClick={() => makePredictions(nn.id)}
                    className="btn btn-primary"
                  >
                    Select Model
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr />

        <h3 className="my-4">Upload a dataset for predictions:</h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="dataset" className="form-label">
              Dataset:
            </label>
            <input
              className="form-control"
              type="file"
              name="dataset"
              accept=".csv"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>

        <div className="progress" style={{ height: "1.5rem" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyModels;
