import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../css/InformationPage.css';
import Narrator from "../../api/ScreenReader";

const API_URL = process.env.REACT_APP_API_BASE_URL;

function InformationPage() {
    const navigate = useNavigate();
    const [backendText, setText] = useState(null);

    // useEffect(() => {
    //     fetch(`${API_URL}api/vo/`)
    //         .then((resp) => resp.json())
    //         .then((resp)=> {
    //             setText(resp.text);
    //     })
    // }, []);

    const Button = ({onClick, className}) => (
        <div className="fancy" href="#" onClick={onClick} id="to-hyperparameter-tuning-frominformationpage">
            <span className="top-key"></span>
            <span className="text" tabIndex="0" onKeyPress={onClick}>Build a Neural Network</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </div>
    );
    // const Narrator = ({onClick, className}) => (
    //     <div className="screenReader" id="read-aloud" onClick={onClick}>
    //         <span className="top-key"></span>
    //         <span className="text">Read Aloud</span>
    //         <span className="bottom-key-1"></span>
    //         <span className="bottom-key-2"></span>
    //     </div>
    // );
    //
    // function readAloud() {
    //
    //     // const text = document.querySelector('#block').innerText;
    //     // const speech = new SpeechSynthesisUtterance(text);
    //     // window.speechSynthesis.speak(speech);
    //
    //     const textElement = document.querySelector(".InfoText");
    //     if (textElement !== null) {
    //         const text = textElement.textContent;
    //         // speakText(text);
    //         const speech = new SpeechSynthesisUtterance(text);
    //         window.speechSynthesis.speak(speech);
    //     } else {
    //         console.log("Page text element not found");
    //     }
    //
    // }
    //
    // useEffect(() => {
    //     console.log('useEffect called');
    //     const readAloudButton = document.querySelector('#read-aloud');
    //     readAloudButton.addEventListener('click', readAloud);
    //
    //     return () => {
    //         readAloudButton.removeEventListener('click', readAloud);
    //     };
    // }, [readAloud]);

    return (       
    <div className="fontSize InfoText">
    <div className="heading">
    <h1>WHAT IS A NEURAL NETWORK?</h1>
            <p className="fontSize" >
                Neural networks are computer systems inspired by the human brain. 
                They learn from data to recognize patterns and make decisions. 
                Networks have layers of connected nodes called neurons. 
                By adjusting the connections between neurons, networks improve their performance. 
                They are widely used for tasks like image recognition, language translation, and predictive analysis.
            </p>
    </div>
        <div className="subHeading">
            <h2>NEURAL NETWORK HYPERPARAMETERS</h2>
            <div className="block">
            <h3>1. Activation Function</h3> 
            <p className="fontSize" >
                Activation functions are like switches in a neural network that decide if a neuron should "fire" or not. 
                They help the network understand different patterns. Some popular ones are ReLU, logistic/sigmoid, and tanh. 
                These switches make networks smarter by handling complex information. Without them, networks could only understand simple relationships.
            </p>
            </div>
            <div className="block">
            <h3>2. Learning Rate</h3>
            <p className="fontSize" >
                Learning rate is a crucial setting in training neural networks. 
                It controls how much the network changes based on new data. 
                A small learning rate makes slow, careful adjustments, while a large one makes bigger, faster changes. 
                Picking the right learning rate helps the network learn effectively without overshooting the best solution.
            </p>
            </div>
            <div className="block">
            <h3>3. Hidden Layers and Number of Neurons</h3>
            <p className="fontSize" >
                Hidden layers are the middle part of neural networks, between input and output layers. 
                They contain neurons that help process and understand data. 
                The number of neurons in a hidden layer affects the network's capacity to learn complex patterns. 
                More neurons can capture richer information, but may take longer to train and risk overfitting. 
                Choosing the right balance helps create efficient and accurate networks.
            </p>
            </div>
            <div className="block">
            <h3>4. Solver</h3>
            <p className="fontSize" >
                A solver is an algorithm used to optimize a neural network's performance. 
                It adjusts the connections between neurons to minimize errors during training. 
                Common solvers include gradient descent and its variations like stochastic gradient descent and Adam. 
                Choosing the right solver helps the network learn faster and more accurately, adapting to different tasks and data types.
            </p>
            </div>
        </div>
            <div className="info-button">
                <Button onClick={() => navigate("/hyperparameter-tuning")}/>
            </div>
        </div>
    );
}


export default InformationPage;
