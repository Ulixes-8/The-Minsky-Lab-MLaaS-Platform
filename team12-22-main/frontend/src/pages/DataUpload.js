import React, { useEffect, useState } from "react";
import CheckItem from "../component/CheckItem.tsx";
import "../css/DataUpload.css";
import TopHeader from "../component/TopHeader/index.js";
import {useLocation, useNavigate} from 'react-router-dom';
import Footer from "../component/Footer/index.js";
import Loading from '../component/Loading/Loading.js';
import { getCookie } from "../api/CSRFCookie.js";
import LoggedInGuard from "../api/LoggedInGuard";
import BackgroundParticle  from "../component/BackgroundParticle/BackgroundParticle.js";
//import TryOurDatasets from "../component/TryOurDatasets.tsx";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";

const API_URL = process.env.REACT_APP_API_BASE_URL; 
const test = "ghughi";

export default function DataUpload() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertmessage, setAlertmessage] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  LoggedInGuard('/login', false);

  ScreenReaderHandler();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [checklist, setChecklist] = useState([
    { id: "Accuracy", text: "My data is accurate and free of errors (i.e., the data is high quality and reflects reality).", isChecked: false },
    { id: "Consistency", text: "My data is consistent (i.e., things that are the same look the same).", isChecked: false },
    { id: "Labeling", text: "My data is well-labeled with clear and consistent names for all variables and examples.", isChecked: false },
    { id: "Formatting", text: "My data is tabular (i.e., represented in rows and columns) and in a CSV file.", isChecked: false },
    { id: "Balance", text: "My data is balanced, with no one class or type of example overrepresented in the dataset.", isChecked: false },
    { id: "Representativeness", text: "My data is representative of the problem I am trying to solve (i.e., I am not trying to use data about apples to predict something about oranges).", isChecked: false },
    { id: "Bias", text: "My data is free of biases that could lead to discrimination or unfair treatment of any group of people.", isChecked: false },
    { id: "Target Variable", text: "My data is in a format where the target variable (what I'm trying to predict) is in the last column.", isChecked: false },
    { id: "Reviewed", text: "My data is reviewed, and irrelevant (non-predictive and/or fully unique) columns (such as ID number) are deleted.", isChecked: false },
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

  // function GetID() {
  //   const [error, setError] = useState(null);
  //   const [isLoaded, setIsLoaded] = useState(false);
  //   const [items, setItems] = useState([]);
  //
  //   useEffect(() => {
  //       fetch("http://localhost/api/profile")
  //           .then(res => {
  //               if (res.ok) {
  //                   return res.json();
  //               }
  //               else {
  //                   return error;
  //               }
  //           })
  //           .then(data => {
  //               setItems(items)
  //           })
  //   }, [])
  //     return items["id"]
  // }

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
    // postData(formData, 'api/file-upload/')
    //     .then((res) => {
    //       if (res.success) {
    //         setIsLoading(false);
    //         navigate('/data-processing', {state: {file: file}});
    //       }
    //       else {
    //         alert("AN ERROR HAS OCCURRED!!!!!!")
    //       }
    //     })
    //   fetch(
    //       `${API_URL}api/file-upload/`,
    //       {
    //         method: 'POST',
    //         body: formData,
    //       }
    //   )
    //       .then((response) => response.json())
    //       .then((result) => {
    //           setIsLoading(false);
    //         console.log('good: ', result);
    //         navigate('/data-processing', {state: {file: file}});
    //       })
    //       .catch((error) => {
    //         console.log('error: ', error);
    //         navigate('/');
    //       })

  }

  function isCSVFile(file) {
    return file.name.endsWith(".csv");
  }

function handleFileUpload() {
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
        // const formData = new FormData();
        // formData.append('File', selectedFile);
        // fetch(
        //     'http://localhost/api/file-upload/',
        //     {
        //       method: 'POST',
        //       body : formData,
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((result) => {
        //       console.log('good: ', result);
        //     })
        //     .catch((error) => {
        //       console.log('error: ', error);
        //     })
      } else {
        setAlertmessage(selectedFile.name);
        console.log("Please select a CSV file");
      }
    };
  } else {
    alert("Please complete the checklist before uploading.");
  }
}

  if (isLoading) {
    return (<Loading />)
  } else {
    return (
      <div>
        <BackgroundParticle />               
        <TopHeader />
        <div className="fontSize ScreenReading">
          <div className="upload-page-container">
            <h1 className="upload-page-header">Dataset Upload</h1>
            {/*<p>this is thew url: {window.location.href}</p>*/}
            {/*  <p>{process.env.NODE_ENV} : This is the API URL: {API_URL}</p>*/}
            <h3 className="upload-page-text">Before uploading your dataset, please complete the following checklist:</h3>
            <ul className="upload-page-checklist">
              {checklist.map(item => (
                <CheckItem key={item.id} id={item.id} text={item.text} isChecked={item.isChecked}
                  onToggle={() => handleChecklistToggle(item.id)} />
              ))}
            </ul>
            <div className="btn-area">
              <button className="upload-page-select-button" onClick={handleFileUpload} id="select-csv-dataset"
                disabled={!checklist.every(item => item.isChecked)}>
                Select CSV dataset
              </button>
              <button className="upload-page-button" onClick={handleUpload} id="upload-dataset" disabled={!isAuthenticated}>
                Upload DataSet
              </button>
            </div>
            {alertmessage &&
              <p className="upload-page-alert-message1">Your file is {alertmessage}, which is not .csv file, please try again. </p>}

            {isAuthenticated && file && <p className="upload-page-alert-message2"> You have uploaded the {file.name}.</p>}

          </div>

        </div>
      </div>
    );
  }
}



// async function handleFileUpload(file) {
//   const formData = new FormData();
//   formData.append('file', file);
//   try { 
//     const response = await axios.post('/team12-22/main/views.py', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         // add any other required headers, e.g., for authentication
//       },
//     });

//      // handle the response data   
//      console.log(response.data);
//     } catch (error) {
//       console.error('Error during file upload:', error);
//     }
//   }