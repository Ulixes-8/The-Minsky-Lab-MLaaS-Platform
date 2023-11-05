import { Button, Col, Descriptions, Divider, Row, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TopHeader from '../component/TopHeader/index.js';
import Loading from '../component/Loading/Loading.js';
import Footer from '../component/Footer/index.js'
import DataOverview from '../component/DataOverview/index.tsx';
import DataStatic from '../component/DataStatic/index.tsx';
import FeatureRanking from '../component/FeatureRanking/index.tsx';
import ScreenReaderHandler from '../component/Accessibility/ScreenReaderHandler';
import ScreenReaderRunner from '../component/ScreenReader/ScreenReaderRunner';

import '../css/DataProcessing.css'
import BackgroundParticle from "../component/BackgroundParticle/BackgroundParticle.js";


const API_URL = process.env.REACT_APP_API_BASE_URL;

interface ResponseData {
    dataset_info: string;
    is_classification: string;
    preview_data: string;
    check_missing_values: string;
    check_infinite_values: string;
    check_duplicates: string;
    drop_rows: string;
    remove_missing_values: string;
    remove_infinite_values: string;
    remove_duplicates: string;
    classes: string;
    encode_categorical_variables: string;
    normalize_data: string;
    top_features: string;
    missing_values_chart: string;
    feature_importance_chart: string;
    top_features_alt: string;
    first_alt_data: string;
}

// const DatasetInfo: React.FC = (data) => {
//
//   return (
//     <div className="dataset-info">
//       {data ? (
//         <div>
//           <h2>Dataset Information</h2>
//           <p><strong>Dataset Info:</strong> {data?.dataset_info}</p>
//           <p><strong>Is Classification:</strong> {data?.is_classification}</p>
//           <p><strong>Preview Data:</strong> {data?.preview_data}</p>
//           <p><strong>Check Missing Values:</strong> {data?.check_missing_values}</p>
//           <p><strong>Check Infinite Values:</strong> {data?.check_infinite_values}</p>
//           <p><strong>Check Duplicates:</strong> {data?.check_duplicates}</p>
//           <p><strong>Drop Rows:</strong> {data?.drop_rows}</p>
//
//         </div>
//       ) : (
//         <p>Loading dataset information...</p>
//       )}
//     </div>
//   );
// };
//
// const DatasetCleanedInfo: React.FC = (data) => {
//
//   return (
//     <div className="dataset-stats">
//       {data ? (
//         <div>
//           <h2>Preprocessed Dataset Information</h2>
//           <p><strong>Cleaned Dataset Info:</strong> {data?.dataset_info}</p>
//           <p><strong>Remove Missing Values:</strong> {data?.remove_missing_values}</p>
//           <p><strong>Remove Infinite Values:</strong> {data?.remove_infinite_values}</p>
//           <p><strong>Remove Duplicates:</strong> {data?.remove_duplicates}</p>
//           <p><strong>Classes:</strong> {data?.classes}</p>
//           <p><strong>Encode Categorical Variables:</strong> {data?.encode_categorical_variables}</p>
//           <p><strong>Normalize Data:</strong> {data?.normalize_data}</p>
//         </div>
//       ) : (
//         <p>Preprocessing dataset...</p>
//       )}
//     </div>
//   );
// };
//
// const TopFeaturesInfo: React.FC = (data) => {
//
//   return (
//     <div className="top-features-info">
//       {data ? (
//         <div>
//           <h2>Top Features</h2>
//
//           <p><strong>Top Features:</strong> {data?.top_features}</p>
//
//         </div>
//       ) : (
//         <p>Loading top features...</p>
//       )}
//     </div>
//   );
// };



function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}

function sendFile(formData) {
    return fetch(
        `${API_URL}api/file-upload/`,
        {
            method: 'POST',
            body: formData,
        }
    )
        .then((response) => response.json())
    // .then((result) => {
    //     console.log('good: ', result);
    // })
    // .catch((error) => {
    //     console.log('error: ', error);
    // })
}

function getData() {
    return fetch(`${API_URL}api/preprocess`)
        .then((response) => response.json())
}
export default function DataProcessing() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ResponseData | null>(null);
    // file from DataUpload
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const file = location.state?.file; // Access the file from location.state object

    useEffect(() => {
        ScreenReaderRunner();
    }, [isLoading]);


    ScreenReaderHandler();

    const Button1 = ({ onClick, className }) => (
        <div className="fancy" href="#" onClick={onClick} id="to-informationpage-fromdataprocessing">
            <span className="top-key"></span>
            <span className="text" tabIndex="0" onKeyPress={onClick}>What is a Neural Network?</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </div>
    );
    const Button2 = ({ onClick, className }) => (
        <div className="fancy" href="#" onClick={onClick} id="to-hyperparameter-tuning-frompreprocessing">
            <span className="top-key"></span>
            <span className="text" tabIndex="0" onKeyPress={onClick}>Build a Neural Network</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </div>
    );

    console.log("the file passed from data upload is : ", file);

    const formData = new FormData();
    formData?.append('file', file);
    // for set loading part , it should  be
    // useEffect -> setIsLoading(true)
    // -> POST file to backend,
    // -> wait
    // -> res ==>  setIsLoading(false)

    //

    // useEffect(() => {
    // //setIsLoading(true)
    // const formData = new FormData();
    // formData?.append('file', file);
    // fetch(
    //     'https://team12-22.bham.team/api/file-upload/',
    //     {
    //         method: 'POST',
    //         body : formData,
    //     }
    //     )
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log('good: ', result);
    //     })
    //     .catch((error) => {
    //         console.log('error: ', error);
    //     })
    // //setTimeout(null, 2000);

    
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true); 
            const response = await fetch(`${API_URL}api/preprocess`);
            if (response?.ok) {
                const responseData = await response.json();
                setData(responseData);
                setIsLoading(false);
            } else {
                alert("An error occurred, please try again");
                setIsLoading(false);
                navigate("/dataupload");
            }

        }
        fetchData();
    }, []);
        
    // // setTimeout( () => {
    // //     setIsLoading(false)
    // // }, 1000);
    // })


    // useEffect(() => {
    //     if (loading == false) {
    //
    //     }
    // })


    return <>
        {
            isLoading ? <Loading /> : <div className='layout-box'>
                <BackgroundParticle/>
                <TopHeader />
            <div className="fontSize ScreenReading">
                <h2 className='layout-title'>Data Preprocessing</h2>
                <div className="dataset-info">
                    {/* {data ? ( */}
                    <div className='data-context'>
                        <h2 className='data-context-title'>Dataset <br/>Information</h2>
                        <div className='data-context-content'>
                            <div className='fontSize data-context-text'>
                                <p><strong>Dataset Info:</strong> {data?.dataset_info}</p>
                                <p><strong>Problem Type:</strong> {data?.is_classification}</p>
                                {/*<p><strong>Preview Data:</strong> {data?.preview_data}</p>*/}
                                <p><strong>Check Missing Values:</strong> {data?.check_missing_values}</p>
                                <p><strong>Check Infinite Values:</strong> {data?.check_infinite_values}</p>
                                <p><strong>Check Duplicates:</strong> {data?.check_duplicates}</p>
                                {/* <p><strong>Drop Rows:</strong> {data?.drop_rows}</p> */}
                            </div>
                            <div className="chart-container">
                                {data && data.missing_values_chart && (
                                    <img className="chart-image" src={`data:image/png;base64,${data.missing_values_chart}`} alt={"missing values chart with values" + data.first_alt_data }/>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ) : (
                        <p>Loading dataset information...</p>
                    )} */}
                </div>
                <div className="dataset-stats">
                    {/* {data ? ( */}
                    <div className='data-context'>
                        <div className="data-context-content">
                            <div className='fontSize data-context-text'>
                                {/* <p><strong>Cleaned Dataset Info:</strong> {data?.dataset_info}</p> */}
                                <p><strong>Impute Missing Values:</strong> {data?.remove_missing_values}</p>
                                <p><strong>Remove Infinite Values:</strong> {data?.remove_infinite_values}</p>
                                <p><strong>Consider Removing Duplicates:</strong> {data?.remove_duplicates}</p>
                                <p><strong>Classes:</strong> {data?.classes}</p>
                                <p><strong>Encode Categorical Variables:</strong> {data?.encode_categorical_variables}</p>
                                <p><strong>Normalize Data:</strong> {data?.normalize_data}</p>
                            </div>
                        </div>
                        <h2 className='data-context-title'>Preprocessed <br/>Dataset <br/>Information</h2>
                    </div>
                    {/* ) : (
                        <p>Preprocessing dataset...</p>
                    )} */}
                </div>
                <div className="top-features-info">
                    {/* {data ? ( */}
                    <div className='data-context'>
                        <h2 className='data-context-title'>Top<br/>Features</h2>
                        <div className='data-context-content'>
                            <div className='fontSize data-context-text'>
                                <p><strong>Top Features:</strong> {data?.top_features}</p>
                            </div>
                            <div className="chart-container">
                                {data && data.missing_values_chart && (
                                    <img className="chart-image" src={`data:image/png;base64,${data.feature_importance_chart}`} alt={"feature importance chart with values" + data.top_features_alt}/>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ) : (
                        <p>Loading top features...</p>
                    )} */}
                </div>
                {/*<DatasetInfo data/>*/}
                {/*<DataStatic data/>*/}
                {/*<FeatureRanking data/>*/}
                <div className='layout-foot'>
                    <Button1 className="info-btn" onClick={() => navigate("/informationpage")} /></div>
                    <div className='layout-foot'>
                    <Button2 className="info-btn" onClick={() => navigate("/hyperparameter-tuning")} />
                </div>
            </div>
            </div>
        }
    </>
}
