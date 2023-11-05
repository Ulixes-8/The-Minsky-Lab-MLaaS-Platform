// import { Redirect } from "react-router-dom";
import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";
import React, {useState} from "react";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
//import { useLocation } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_BASE_URL;

function Speak() {
    const [isListening, setIsListening] = useState(false);
    const navigate = useNavigate();


    //const location = useLocation();
    const commands = [

        {
            command: ["Go to * page", "Go to *", "Open * page", "Open *",
                "Navigate to * page", "Navigate to *", "Redirect to * page",
                "Navigate me to * page", "Navigate me to *",
                "Redirect to *", "Take me to * page", "Take me to *", "Move to * page",
                "Go to the * page", "Go to the *", "Open the * page", "Open the *",
                "Navigate to the * page", "Navigate to the *", "Redirect to the * page",
                "Navigate me to the * page", "Navigate me to the *",
                "Redirect to the *", "Take me to the * page", "Take me to the *", "Move to the * page"],
            callback: (redirectPage) => setRedirectUrl(redirectPage),
        },
        {
            command: ["Click on build a neural network", "Click on the build a neural network",
                "Click on build neural network", "Click on the build neural network",
                "Click on build a neural network button", "Click on the build a neural network button",
                "Click on build neural network button", "Click on the build neural network button",
                "Click on build a model", "Click on build a model button",
                "Click on the build a model button", "Click on the build model button", "Build a neural network"],
            callback: () => {

                const currentPage = window.location.pathname.substring(1);

                if (currentPage === "") {
                    // if home page then redirect to dataupload page
                    //change home page build neural network button id to "to-dataupload"
                    const buildButton = document.getElementById("to-dataupload");
                    buildButton.scrollIntoView({behavior: "smooth"});
                    setTimeout(() => buildButton.click(), 1500);
                    //setTimeout function to delay the click event until after the scrolling has completed:
                    //window.location.assign(`${API_URL}${"dataupload"}`);
                    //only uncomment this line if the scroll doesnt work
                } else if (currentPage === "data-processing") {
                    // scroll to the position of the button and show the button being clicked
                    const buildButton = document.getElementById("to-hyperparameter-tuning-frompreprocessing");
                    buildButton.scrollIntoView({behavior: "smooth"});
                    setTimeout(() => buildButton.click(), 1500);
                    //window.location.assign(`${API_URL}${"hyperparameter-tuning"}`);
                } else if (currentPage === "informationpage") {
                    const buildButton = document.getElementById("to-hyperparameter-tuning-frominformationpage");
                    buildButton.scrollIntoView({behavior: "smooth"});
                    setTimeout(() => buildButton.click(), 1500);
                    //setRedirectUrl("some other page");
                } else {
                    window.location.assign(`${API_URL}${"dataupload"}`);
                }
            },
        },
        //DATAUPLOAD PAGE COMMANDS
        {
            command: ["Upload a dataset", "Upload a data set"],
            callback: () => {

                const currentPage = window.location.pathname.substring(1);

                if (currentPage === "dataupload") {
                    const buildButton = document.getElementById("upload-dataset");
                    buildButton.scrollIntoView({behavior: "smooth"});
                    setTimeout(() => buildButton.click(), 700);
                }
            },
        },
        {
            command: ["Select csv dataset", "Select a csv dataset", "Select a csv data set", "Select a csv data set", "Select a data set", "Select a dataset"],
            callback: () => {

                const currentPage = window.location.pathname.substring(1);

                if (currentPage === "dataupload") {
                    const buildButton = document.getElementById("select-csv-dataset");
                    buildButton.scrollIntoView({behavior: "smooth"});
                    buildButton.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));

                }
            },
        },
        {
            command: ["Toggle accuracy", "Check accuracy", "Uncheck accuracy"],
            callback: () => {
                const checkbox = document.getElementById("Accuracy");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle consistency", "Check consistency", "Uncheck consistency"],
            callback: () => {
                const checkbox = document.getElementById("Consistency");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle labeling", "Check labeling", "Uncheck labeling"],
            callback: () => {
                const checkbox = document.getElementById("Labeling");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle Formatting", "Check Formatting", "Uncheck Formatting"],
            callback: () => {
                const checkbox = document.getElementById("Formatting");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle Balance", "Check Balance", "Uncheck Balance"],
            callback: () => {
                const checkbox = document.getElementById("Balance");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle Representativeness", "Check Representativeness", "Uncheck Representativeness"],
            callback: () => {
                const checkbox = document.getElementById("Representativeness");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle Bias", "Check Bias", "Uncheck Bias"],
            callback: () => {
                const checkbox = document.getElementById("Bias");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle Target Variable", "Check Target Variable", "Uncheck Target Variable"],
            callback: () => {
                const checkbox = document.getElementById("Target Variable");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Toggle Reviewed", "Check Reviewed", "Uncheck Reviewed"],
            callback: () => {
                const checkbox = document.getElementById("Reviewed");
                if (checkbox) {
                    checkbox.click();
                }
            },
        },
        {
            command: ["Upload a dataset", "Upload a data set"],
            callback: () => {

                const currentPage = window.location.pathname.substring(1);

                if (currentPage === "dataupload") {
                    const buildButton = document.getElementById("upload-dataset");
                    buildButton.scrollIntoView({behavior: "smooth"});
                    setTimeout(() => buildButton.click(), 700);
                }
            },
        },
        //DATA PROCESSING PAGE COMMANDS
        {
            command: ["What is a neural network", "Click on what is a neural network", "Click on what is a neural network button"],
            callback: () => {

                const currentPage = window.location.pathname.substring(1);

                if (currentPage === "data-processing") {
                    const buildButton = document.getElementById("to-informationpage-fromdataprocessing");
                    buildButton.scrollIntoView({behavior: "smooth"});
                    setTimeout(() => buildButton.click(), 900);
                }
            },
        },
        {
            command: ["Scroll up"],
            callback: () => window.scrollBy(0, -150),
        },
        {
            command: ["Scroll down", "Go down"],
            callback: () => window.scrollBy(0, 150),
        },
        {
            command: ["Go back", "Go back to previous page", "Go back to the previous page"],
            callback: () => window.history.back(),
        },
        {
            command: ["Scroll to top", "Scroll to the top", "Come to the top", "Come to top", "Go to the top", "Go to top", "Go back up", "Go back to the top", "Go back to top"],
            callback: () => window.scrollTo(0, 0),
        },
        {
            command: ["Scroll to bottom", "Scroll to the bottom", "Come to the bottom", "Come to bottom", "Go to the bottom", "Go to bottom", "Go back down", "Go back to the bottom", "Go back to bottom"],
            callback: () => window.scrollTo(0, document.body.scrollHeight),
        },
    ];


    const {transcript, resetTranscript} = useSpeechRecognition({
        commands,
        continuous: true // enable continuous speech recognition
    });

    commands.forEach((command) => {
        const originalCallback = command.callback;
        command.callback = (...args) => {
            originalCallback(...args);
            resetTranscript();
        }
    });



    const [redirectUrl, setRedirectUrl] = useState("");
    const pages = ["home", "data upload", "my lab", "contact", "logout"];
    const urls = {
        home: "",
        "data upload": "dataupload",
        "my lab": "mylab",
        contact: "privacy-policy",
        "logout": "logout",
    };

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        <p>Your browser does not support Speech Recognition {redirectUrl}</p>;
        return null;
    }

    let redirect = "";

    if (redirectUrl) {
        if (pages.includes(redirectUrl)) {
            // console.log(redirectUrl);
            // console.log(urls[redirectUrl]);
            window.location.assign(`${API_URL}${urls[redirectUrl]}`);

            // navigate(urls[redirectUrl]);

            // redirect = <Redirect to={urls[redirectUrl]} />;
        } else {
            redirect = <p>Could not find what you were looking for. Please try again {redirectUrl}</p>;
        }
    }

    function startListen() {
        setIsListening(true);
        SpeechRecognition.startListening({continuous: true});
    }

    function stopListen() {
        setIsListening(false);
        SpeechRecognition.abortListening()
    }

    return (
        <div>
            <li>
            <button
                className={`accesslist-button ${isListening ? "listening" : ""}`}
                onClick={() => {
                    if (isListening) {
                        stopListen();
                    } else {
                        startListen();
                    }
                }}
            >
                {isListening ? "Stop Listening" : "Start Listening"}
            </button>


            </li>
            {isListening ? <p id="transcript" className="accesslist-text">Transcript: {transcript}</p> : null}

        </div>
    );
}

export default Speak;
