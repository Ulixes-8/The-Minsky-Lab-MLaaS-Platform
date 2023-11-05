import React, { useState, useEffect } from "react";
import { getCookie } from "../api/CSRFCookie.js";
import { useNavigate, useLocation } from 'react-router-dom';
import TopHeader from "../component/TopHeader/index.js";
import LoggedInGuard from "../api/LoggedInGuard";
import "../css/TrainingAndEvaluation.css";
import Loading from '../component/Loading/Loading.js';
import BackgroundParticle from "../component/BackgroundParticle/BackgroundParticle.js";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const TrainingAndEvaluation = () => {
    const [isTraining, setisTraining] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [nnName, setNnName] = useState("");
    const [action, setAction] = useState("");
    const [formError, setFormError] = useState(null);
    const [height, setHeight] = useState(400);
    const [width, setWidth] = useState(400);
    const navigate = useNavigate();
    const location = useLocation();
    const [training, Training] = useState(true);
    const evaluationMetrics = location.state?.evaluationMetrics; // Access the file from location.state object
    const err = location.state?.err;
    //const [trainingLog, setTrainingLog] = useState('');



    LoggedInGuard('/login', false);
    useEffect(() => {
        setisTraining(true);
        if (err) {
            setErrMsg(err);
        }
        if (evaluationMetrics.accuracy) {
            setHeight(700);
        }
        setisTraining(false);
    }, []);

    ScreenReaderHandler();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (action === "save_and_retrain" || action === "save_and_continue") {
            // Check if nnName is provided
            if (!nnName) {
                setFormError("Please enter a name for the neural network");
                return;
            }
        }

        if (!action) {
            setFormError("Please choose an option");
            return;
        }
        // Clear any previous form error
        setFormError("");


        try {
            const formData = new FormData();
            formData.append("nn_name", nnName);
            formData.append("action", action);
            console.log(formData);

            const token = getCookie("csrftoken");
            //alert("got the token" + token);
            fetch(`${API_URL}api/post-evaluation/`, {
                headers: {
                    "X-CSRFToken": token,
                },
                method: "POST",
                body: formData,
            })
                .then((response) => response.text())
                .then((res) => {
                    console.log(res);

                    //window.location.assign(`${API_URL}${res}`);

                    navigate(res);
                });
        } catch (error) {
            console.log(error);
            setFormError(error);
        }
    };


    return (
        isTraining ? <Loading /> :
            <div>
                <BackgroundParticle>
                </BackgroundParticle>
                <TopHeader />
                <div className="ScreenReading">
                    <div className="fontSize TrainingText">
                        <h2 className="upload-page-header">Training and Evaluation</h2>
                        {errMsg && <div>Some error occur in our backend, Sorry</div>}
                        <div>
                            {evaluationMetrics && evaluationMetrics.mae ? (
                                <div className="container first-container">
                                    <h2>Mean Absolute Error: {evaluationMetrics.mae}</h2>
                                    <div className="plot-container">
                                        <h3 className="fontSize">{evaluationMetrics.explanation_MAE}<br /><br />{evaluationMetrics.explanation_residual_histogram}</h3>
                                        <img className="chart-image" src={`data:image/png;base64,${evaluationMetrics.plot}`}
                                            alt={"Evaluation Plot with data " + evaluationMetrics.alt_text} height={height} width={width} />
                                    </div>
                                </div>
                            ) : evaluationMetrics.accuracy ? (
                                <div className="container first-container">
                                    <div className="flex-container">
                                        <div className="metric-container">
                                            <h2>Accuracy Score: <br />{evaluationMetrics.accuracy}</h2>
                                        </div>
                                        <div className="metric-container">
                                            <h2>Precision Score: <br />{evaluationMetrics.precision}</h2>
                                        </div>
                                        <div className="metric-container">
                                            <h2>Recall Score: <br />{evaluationMetrics.recall}</h2>
                                        </div>
                                        <div className="metric-container">
                                            <h2>F1 Score: <br />{evaluationMetrics.f1}</h2>
                                        </div>
                                    </div>
                                    <div className="plot-container">
                                        <h3 className="fontSize">{evaluationMetrics.accuracy_explanation}<br /><br />{evaluationMetrics.precision_explanation}</h3>
                                        <img className="chart-image" src={`data:image/png;base64,${evaluationMetrics.plot}`}
                                            alt={"Evaluation Plot with data" + evaluationMetrics.alt_text} height={height} width={width} />
                                        <h3 className="fontSize">{evaluationMetrics.recall_explanation}<br /><br />{evaluationMetrics.f1_explanation}</h3>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {evaluationMetrics && (
                            <div className="frame">
                                <div className="container.second-container.form-container">
                                    <h3 className="fontSize option-header">Choose an option:</h3>
                                    <form onSubmit={handleSubmit}>

                                        <div className="input-style-1">
                                            <label htmlFor="nn_name">Neural Network Name:</label>
                                            <input
                                                type="text"
                                                name="nn_name"
                                                id="nn_name"
                                                className="form-control"
                                                placeholder="Enter a name for the neural network"
                                                value={nnName}
                                                onChange={(e) => setNnName(e.target.value)}
                                            />
                                        </div>

                                        <div className="input-style-container">
                                            <div className="input-style">
                                                <div className="form-row option-row">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="action"
                                                            id="save_and_retrain"
                                                            value="save_and_retrain"
                                                            checked={action === "save_and_retrain"}
                                                            onChange={(e) => setAction(e.target.value)}
                                                        />
                                                        <label className="modulelabel" htmlFor="save_and_retrain">
                                                            <span className="fontSize">Save and Retrain</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="input-style">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="action"
                                                        id="discard_and_retrain"
                                                        value="discard_and_retrain"
                                                        checked={action === "discard_and_retrain"}
                                                        onChange={(e) => setAction(e.target.value)}
                                                    />
                                                    <label className="modulelabel" htmlFor="discard_and_retrain">
                                                        <span className="fontSize">Discard and Retrain</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-style">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="action"
                                                        id="save_and_continue"
                                                        value="save_and_continue"
                                                        checked={action === "save_and_continue"}
                                                        onChange={(e) => setAction(e.target.value)}
                                                    />
                                                    <label className="modulelabel" htmlFor="save_and_continue">
                                                        <span className="fontSize">Save and Continue</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {formError && <p>{formError}</p>}
                                        <button type="submit" className="btn-primary">
                                            <span className="fontSize">Submit</span>
                                        </button>
                                    </form>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>

    );
};

export default TrainingAndEvaluation;
