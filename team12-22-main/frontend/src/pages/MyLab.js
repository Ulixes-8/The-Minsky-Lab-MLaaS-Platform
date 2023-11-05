import React, {useState, useEffect} from "react";
import {getData} from "../api/GetRequest.js";
import {postData} from "../api/PostRequest";
import {getCookie} from "../api/CSRFCookie.js";
import LoggedInGuard from "../api/LoggedInGuard";
import TopHeader from "../component/TopHeader/index.js";
import "../css/MyLab.css";
import brain from "../css/hd2.jpg";
import Narrator from "../api/ScreenReader.js";
import CheckItem from "../component/CheckItem.tsx";
import RadioItem from "../component/RadioItem.tsx";
import BackgroundParticle  from "../component/BackgroundParticle/BackgroundParticle.js";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";
import ScreenReaderRunner from "../component/ScreenReader/ScreenReaderRunner";
// NOTES FOR FRONTEND TEAM:
// Please make it so the table displays with correct padding
// Can we also make it so the selected row is highlighted?
// Can we also make it so when the page is visited, it automatically scrolls to the top?

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function MyLab() {
    const [rawModels, setModels] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [currentModels, setCurrentModels] = useState(null);
    const [tableLoaded, setTableLoaded] = useState(false);
    const [sortOrderAsc, setSortOrder] = useState(true);
    const [selectedModel, setSelectedModel] = useState(null);
    const [predictionFile, setPredictionFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [file, setFile] = useState(null);
    const [alertmessage, setAlertmessage] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    ScreenReaderHandler();
    useEffect(() => {
        ScreenReaderRunner();
    }, [tableLoaded]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        scrollToTop();
    }, [location]);

  useEffect(() => {
    if (imageLoaded) {
      document.querySelector('.fade-in').classList.add('fade-in-start');
    }
  }, [imageLoaded]);
    const [checklist, setChecklist] = useState([
        { id: "IMPORTANT", text: "The dataset you upload to make predictions on must have exactly the same columns/features as the original dataset EXCEPT the final column (the target variable), which must be removed.", isChecked: false },
      ]);
      
      function handleChecklistToggle(id) {
        // update checklist array, only change the target isChecked
        // prev = previous array item , prev array map ->
        setChecklist(prev => prev.map(item => {
          //find the target item ( by id )
          if (item.id === id) {
            // update target item, only change the isChecked's value
            return {
              ...item,
              isChecked: !item.isChecked
            }
          }
          //if it is not normal target, returns normal item
          return item;
        }));
      }
    // Get the user models when the page is loaded
    useEffect(() => {
        getTableData();
    }, []);

    LoggedInGuard('/login', false);


    // Sets the file when uploaded
    function handleFileUpload(event) {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        setPredictionFile(selectedFile);
    }

    // Calls the MakePrediction API and returns a CSV file that is automatically downloaded
    function makePrediction(event) {
        event.preventDefault();
        if (file === null) {
            alert("Please select a file");
        } else if (selectedModel === null) {
            alert("Please select a model");
        } else {
            //alert('start prediction with id: ' + selectedModel);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('neural_network', selectedModel);
            const token = getCookie('csrftoken')
            fetch(
                `${API_URL}api/predict/`,
                {
                    headers: {
                        'X-CSRFToken': token,
                    },
                    method: 'POST',
                    body: formData,
                }
            )
                .then((resp) => {
                    const resp2 = resp.clone();
                    resp.json()
                        .then((resp) => {
                            alert(resp.details);
                        })
                        .catch((error) => {
                            resp2.blob()
                                .then((resp) => {
                                    const url = window.URL.createObjectURL(
                                        new Blob([resp]),
                                    );
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.setAttribute(
                                        'download',
                                        'predictions.csv',
                                    );
                                    document.body.appendChild(link);
                                    link.click();
                                    link.parentNode.removeChild(link);
                                    // alert("done");
                                })
                        })
                });
            // .then((response) => response.blob())
        }
    }

    function deleteModel(id) {
        const nn_id = id;
        const body = JSON.stringify({ nn_id });
        postData(body, 'api/models/')
            .then((resp) => {
                if (resp.success) {
                    setSelectedModel(null);
                    getTableData();
                } else {
                    alert(resp.details);
                }
            })
    }

    function deleteModelHandler(event) {
        console.log("button clicked");
        event.preventDefault();
        if (selectedModel === null) {
            alert("Please select a model");
        } else {
            if (window.confirm("Performing this action will permanently delete this model.\nOk to proceed?")) {
                console.log("current model: " + selectedModel);
                deleteModel(selectedModel);
            }
        }
    }

// Selects the current row
    function selectRow(id) {
        // const elems = document.getElementsByClassName('selected');
        // for (const elemsKey in elems) {
        //     elemsKey.className = "";
        // }
        // if (selectedModel !== null) {
        //     document.getElementById(selectedModel)
        // }
        // document.getElementById(id).selected();
        console.log("selected" + id);
        setSelectedModel(id);
    }

// Iterates through the table data and displays each row, has an 'onClick' function
    function mapTableData() {
        return currentModels.map((elem, index) => {
            return (
                <tr id={elem.id} onClick={() => selectRow(elem.id)} className={selectedModel === elem.id ? "selected" : ""} tabIndex="0" onKeyPress={() => selectRow(elem.id)}>
                    <td>{index}</td>
                    <td>{elem.name}</td>
                    <td>{elem.perf}</td>
                </tr>
            )
        })
    }

    function getTableData() {
        // const m = [{
        //     'id': 1,
        //     'name': 'test',
        //     'perf': "good",
        // },
        //     {
        //         'id': 2,
        //         'name': 't2',
        //         'perf': 'bad'
        //     }];
        // setTableLoaded(true);
        // setModels(m);
        // setCurrentModels(m);
        // return;

        // event.preventDefault();
        getData('api/models/')
            .then((resp) => {
                setModels(resp);
                setCurrentModels(resp);
                setTableLoaded(true);
            });
    }

    function searchTable(event) {
        const term = event.target.value;
        if (term.length === 0) {
            setCurrentModels(rawModels);
        }
        console.log(term);
        const searchedModels = rawModels.filter((elem) => {
            console.log(elem.name + ',' + term.toLowerCase);
            console.log(elem.name.toLowerCase().includes(term.toLowerCase));
            return elem.name.toLowerCase().includes(term.toLowerCase());
        })
        setCurrentModels(searchedModels);
    }

    function clearSearch() {
        setCurrentModels(rawModels);
        document.getElementById("searchBox").value = '';
    }
    
    function isCSVFile(file) {
        return file.name.endsWith(".csv");
      }
    
      function handleUpload() {

        // ...
        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        const token = getCookie('csrftoken');
        //alert("got the token" + token);
        fetch(
            `${API_URL}api/file-upload/`,
            {
              headers: {
                'X-CSRFToken': token,
              },
              method: 'POST',
              body: formData,
            }
        )
            .then((response) => response.json())
            .then((res) => {
              if (res.success) {
                setIsLoading(false);
                navigate('/data-processing', {state: {file: file}});
              } else {
                alert("FILE WASN'T UPLOADED")
              }
            })
        
    
      }
    function handleFileUpload1() {
        //if all the boxes are checked then starts a file upload
        if (checklist.every((item) => item.isChecked)) {
          // create HTML input
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.click();
          // async onChange , if new file is selected, then setFile
          fileInput.onchange = (event) => {
            const selectedFile = event.target.files[0];
            if (isCSVFile(selectedFile)) {
      
              // Set the file
              setFile(selectedFile);
              // setTimeout(() => {
              //   setIsAuthenticated(true)
              // }, 10000);
              setIsAuthenticated(true);
              console.log("Selected file:", selectedFile.name);
              setAlertmessage(null);
            
            } else {
              setAlertmessage(selectedFile.name);
              console.log("Please select a CSV file");
            }
          };
        } else {
          alert("Please complete the checklist before uploading.");
        }
      }


    if (tableLoaded) {
        return (
            <div>
                <BackgroundParticle />   
                <TopHeader />
                <div className="fontSize ScreenReading">
                    <h1 className="upload-page-header">My Lab</h1>
                    <div className="modelSearch">
                        <input type="text" placeholder="Search for model name" onChange={searchTable} id="searchBox"/>
                        <button onClick={clearSearch}>Clear</button>
                    </div>
                    {/*<p>Selected Row: {selectedModel}</p>*/}
                    <div id="table" className="table">
                        <table class="table table-responsive" id="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name of Model</th>
                                    <th>Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mapTableData()}
                            </tbody>
                        </table>
                    </div>
                    <div className="modelDelete">
                        <button onClick={deleteModelHandler} id="delete">Delete Model</button>
                    </div>
                    <div>
                        <div className="disclaimer-container">
                        <h3 className="fontSize">Select a model from your table and then upload your own dataset to make a prediction.<br /><br/>
                            For accurate predictions,please confirm that your dataset satisfies the following condition.</h3>
                        <div className="modelPredict" >
                            {/*<h3>Make a Prediction</h3>*/}
                            {/*<form onSubmit={makePrediction}>*/}
                            {checklist.map(item => (
                                <CheckItem key={item.id} id={item.id} text={item.text} isChecked={item.isChecked}
                                onToggle={() => handleChecklistToggle(item.id)} />
                            ))}
                        </div></div>           
                        
                            <div className="mylabbtn-area">
                            <button className="upload-page-select-button" onClick={handleFileUpload1} id="select-csv-dataset"
                                disabled={!checklist.every(item => item.isChecked)}>
                                Select CSV dataset
                            </button>
                            {/* <button className="upload-page-button" onClick={handleUpload} id="upload-dataset" disabled={!isAuthenticated}>
                                Upload DataSet
                            </button> */}
                            <button type="upload-page-button" id="predict" onClick={makePrediction}>Make a Prediction</button>
                        </div>
                    
                        {alertmessage &&
                        <p className="upload-page-alert-message1">Your file is {alertmessage}, which is not .csv file, please try again. </p>}

                        {isAuthenticated && file && <p className="upload-page-alert-message2"> You have uploaded the {file.name}.</p>}

                        {/* <button onClick={() => document.getElementById('dataset').click()} id="fileButton">Upload a File</button>
                        <input
                            name="dataset"
                            id="dataset"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            style={{display: 'none'}}
                        /> */}
                        {/*</form>*/}
                
                
                <div className="xyz">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '0 auto',
                        }}>
                            {/*<img className="homepage-img"
                            src={brain}
                            alt=""
                            className={`fade-in ${imageLoaded ? 'fade-in-start' : ''}`}
                            onLoad={() => setImageLoaded(true)}
                            style={{width: "40%", height: "40%"}}>
                            </img>

                                    <img className={`homepage-img fade-in ${imageLoaded ? 'fade-in-start' : ''}`}
                                        src={brain}
                                        alt=""
                                        onLoad={() => setImageLoaded(true)}
                                        style={{width: "40%", height: "40%"}}>
                    </img>*/}

                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
        <div className="infopage-container">
            <TopHeader />
            <div className="mylab-error-message">
                <h1 className="upload-page-header">Please logout and login again, we are unable to load your Lab</h1>
                <form onSubmit={getTableData}>
                    <input type="submit" value="Reload" className="reload-button"/>
                </form>
            </div>
        </div>
        )
    }
}