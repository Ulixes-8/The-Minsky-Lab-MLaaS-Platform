import React, {useEffect, useState} from 'react';
import { getCookie } from "../api/CSRFCookie.js";
import { postData } from "../api/PostRequest.js";
import { useNavigate } from 'react-router-dom';
import TopHeader from "../component/TopHeader/index.js";
import LoggedInGuard from "../api/LoggedInGuard";
import "../css/HyperparameterTuning.css";
import CheckItem from "../component/CheckItem.tsx";
import RadioItem from "../component/RadioItem.tsx";
import Loading from '../component/Loading/Loading.js';
import BackgroundParticle  from "../component/BackgroundParticle/BackgroundParticle.js";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";
import ScreenReaderRunner from "../component/ScreenReader/ScreenReaderRunner";
const API_URL = process.env.REACT_APP_API_BASE_URL;

const HyperparameterTuning = () => {
const [numHiddenLayers, setNumHiddenLayers] = useState(1);
const [neuronsPerLayer, setNeuronsPerLayer] = useState([10]);;
  const [actFunc, setActFunc] = useState('relu');
  const [solver, setSolver] = useState('adam');
  const [lrInit, setLrInit] = useState(0.001);
  const [tempLrInit, setTempLrInit] = useState('0.001');
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const [isTraining, setisTraining] = useState(false);

  const Button = ({ onClick, className }) => (
    <div
      className="fancy"
      type="fontSize submit"
      href="#"
      onClick={onClick}
      id="to-trainingpage-fromhyperparametertuning"
    >
      <span className="top-key"></span>
      <span className="text" tabIndex="0" onKeyPress={onClick}>Train Model</span>
      <span className="bottom-key-1"></span>
      <span className="bottom-key-2"></span>
    </div>
  );
  
  const [checklist, setChecklist] = useState([
    { id: "Logistic", text: "The logistic activation function helps turn input signals into a smooth curve, making it easy to predict binary outcomes like yes or no, on or off, or true or false.", isChecked: false,name:"actFunc" },
    { id: "Tanh", text: "The tanh activation function transforms inputs into a range between -1 and 1, creating a smooth curve that helps with decision-making and works well in situations where balanced outcomes are needed.", isChecked: false,name:"actFunc" },
    { id: "Relu", text: "The ReLU activation function quickly simplifies inputs, turning negative values into zero and keeping positive values unchanged, making it efficient for training and widely used in neural networks.", isChecked: true,name:"actFunc" },
  ]);

  const [checklist2, setChecklist2] = useState([
    { id: "SGD", text: "The SGD solver, short for Stochastic Gradient Descent, is a technique that helps neural networks learn by gradually updating their weights using random samples, making it efficient for large datasets and faster than some other methods.", isChecked: false, name:"solver" },
    { id: "Adam", text: "The Adam solver is an optimization method that adjusts learning rates adaptively for each weight in the neural network, resulting in faster convergence and improved accuracy compared to traditional techniques like SGD.", isChecked: true, name:"solver" },
  ]);

  LoggedInGuard('/login', false);
  ScreenReaderHandler();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      
    const formData = new FormData();
      formData.append("actFunc", actFunc);
      formData.append("solver", solver);
      formData.append("lrInit", lrInit);
      formData.append("numNeurons", JSON.stringify(neuronsPerLayer));
      console.log(formData);

      const token = getCookie('csrftoken');
      //alert("got the token" + token);
      fetch(
          `${API_URL}api/hyperparameter-tuning/`,
          {
            headers: {
              'X-CSRFToken': token,
            },
            method: 'POST',
            body: formData,
          }
      ).then((response) => response.json())
      .then((res) => {
        console.log(res);
            if (res.success) {
              setisTraining(true);
                // the user has logged in
                postData(null, 'api/trainingAndEval/')
                  .then((data) => {
                    console.log(data);
                    navigate('/training',  {state: {evaluationMetrics:data}});
                    //setTrainingLog(response.data.training_log);
                  })
                  .catch((error) => {
                    navigate('/training', {state: {'err':error} });
                  });
            } else {
                alert (res.details)
            }
        })
    } catch (error) {
      setFormError(error.response.data.detail);
    }
  };
  
  const handleNumHiddenLayersChange = (val) => {
    const value = parseInt(val);
    const numLayers = (value >= 1 && value <= 5) ? value : 5;
    setNumHiddenLayers(numLayers);

    // Add/remove elements from neuronsPerLayer array to match the number of layers
    const currentNumNeurons = neuronsPerLayer.length;
    if (numLayers > currentNumNeurons) {
      const newNeuronsPerLayer = [...neuronsPerLayer];
      for (let i = currentNumNeurons; i < numLayers; i++) {
        newNeuronsPerLayer.push(10);
      }
      setNeuronsPerLayer(newNeuronsPerLayer);
    } else if (numLayers < currentNumNeurons) {
      setNeuronsPerLayer(neuronsPerLayer.slice(0, numLayers));
    }
  };

  const handleNeuronsPerLayerChange = (event, layerIndex) => {
    const value = parseInt(event.target.value);
    const newNeuronsPerLayer = [...neuronsPerLayer];
    console.log(value);
    if (value >= 100) {
      newNeuronsPerLayer[layerIndex] = 100;
    }
    else if(value <= 0){
      newNeuronsPerLayer[layerIndex] = 0;
    }
    else if(isNaN(value)){
      newNeuronsPerLayer[layerIndex] = 10;
    }
    else{
      newNeuronsPerLayer[layerIndex] = value;
    }
    setNeuronsPerLayer(newNeuronsPerLayer);
  };
  
  const handleIrInit = (event) => {
    const value = parseFloat(event.target.value);
    if (value >=0.001 && value <=0.1){
      setLrInit(value);
      setTempLrInit(value.toString());
    }
    else if (value < 0.001){
      setLrInit(0.001);
      setTempLrInit('0.001');
    }else{
      setLrInit(0.1);
      setTempLrInit('0.1');
    }
    
  };
  const handleInputChange = (event) => {
    setTempLrInit(event.target.value);
  };
  function handleChecklistToggle(id,flag) {
    if(flag==1){
      setChecklist(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isChecked: !item.isChecked
          }
        }
        else{
          return {
            ...item,
            isChecked: false
          }
        }
      }));
    }
    else if(flag==2){
      setChecklist2(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isChecked: !item.isChecked
          }
        }
        else{
          return {
            ...item,
            isChecked: false
          }
        }
      }));
    }

      
  }
  if(isTraining)
  return (<Loading/>)

  return (
    <div className="fontSize hyper">
    <BackgroundParticle>               
    </BackgroundParticle>
    <TopHeader />
    <div className="ScreenReading">
      <h2 className="upload-page-header">Hyperparameter Tuning</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="module1">
        <h3 className="fontSize" style={{ marginRight: '20px' }}>Number of hidden layers: </h3>
        <div class="slider-container" >            
            <div class="slider-wrapper">
              <span class="dot dot-1" tabIndex="0" onKeyPress={() => handleNumHiddenLayersChange("1")}/>
              <span class="dot dot-2" tabIndex="0" onKeyPress={() => handleNumHiddenLayersChange("2")}/>
              <span class="dot dot-3" tabIndex="0" onKeyPress={() => handleNumHiddenLayersChange("3")}/>
              <span class="dot dot-4" tabIndex="0" onKeyPress={() => handleNumHiddenLayersChange("4")}/>
              <span class="dot dot-5" tabIndex="0" onKeyPress={() => handleNumHiddenLayersChange("5")}/>
              <div class="slider-overlay">
                <input
                  class="slider"
                  type="range"
                  min="1"
                  max="5"
                  id="layersSlider"
                  value={numHiddenLayers}
                  onChange={() => handleNumHiddenLayersChange(document.getElementById("layersSlider").value)}
                  tabIndex="-1"
                />
              </div>
            {/*  
              <input  class="dotinput dotinput-1" type="number" max="100" placeholder="1~100" />
              <input  class="dotinput dotinput-2" type="number" max="100" placeholder="1~100" />
              <input  class="dotinput dotinput-3" type="number" max="100" placeholder="1~100"/>
              <input  class="dotinput dotinput-4" type="number" max="100" placeholder="1~100" />
              <input  class="dotinput dotinput-5" type="number" max="100" placeholder="1~100" />
            */} 
            {neuronsPerLayer.map((numNeurons, layerIndex) => (              
              <input className={`dotinput dotinput-${layerIndex + 1}`} type="number" min="0" value={numNeurons}
              max="100" placeholder="1~100"  onChange={(event) => handleNeuronsPerLayerChange(event, layerIndex)} />
          ))}
        </div>
      </div>
      {/*  {neuronsPerLayer.map((numNeurons, layerIndex) => (
          <div key={layerIndex}>
            <label>Number of neurons in layer {layerIndex + 1}:     </label>
            <input type="number" max="100" value={numNeurons} onChange={(event) => handleNeuronsPerLayerChange(event, layerIndex)} />
          </div>
        ))}
      */}
        <div class="selectinput" >Hidden layers help find patterns; more layers make it smarter but can be too specific. <br/>
        Neurons help learn details; more neurons make it more detailed but can be overly precise. <br/>
        Adjust these settings based on the problem's difficulty and the data you have for the best results.</div>
      </div>
        <div className="module2">
        <h3 className="fontSize" style={{ marginRight: '20px' }}>Activation function:     </h3>
          <ul className="upload-page-checklist1">
            {checklist.map(item => (
              <RadioItem key={item.id} id={item.id} text={item.text} isChecked={item.isChecked} name={item.name} value={item.id}
                onToggle={() => handleChecklistToggle(item.id,1)} />
            ))}
          </ul>
        </div>
        <div className="module2">
        <h3 className="fontSize" style={{ marginRight: '20px' }}>Solver:  </h3>
          <ul className="upload-page-checklist1">
            {checklist2.map(item => (
              <RadioItem key={item.id} id={item.id} text={item.text} isChecked={item.isChecked} name={item.name} value={item.id}
                onToggle={() => handleChecklistToggle(item.id,2)} />
            ))}
          </ul>
        </div>
        <div className="module3">
        <h3 className="fontSize" style={{ marginRight: '20px' }}>Learning rate:</h3>
          <input            
            className="lrInitrange"
            type="range"
            id="lrInit"
            name="lrInit"
            min="0.001"
            max="0.100"
            value={lrInit}
            onChange={(event) => handleIrInit(event)}
            step="0.001"
            required
          />
            <input
              class="module3input"
              style={{textAlign: 'center'}}
              type="text"
              value={tempLrInit}
              onChange={handleInputChange}
              onBlur={handleIrInit}
            />
            <div class="selectinput">The learning rate controls how quickly a neural network adapts during training. <br/>A high learning rate speeds up learning but risks overshooting the optimal solution.<br/> A low learning rate provides more precise learning but takes longer and may get stuck in local minima.</div>
        </div>
        {formError && <p>{formError}</p>}
          <form onSubmit={handleFormSubmit}>
          <div className='layout-foot'>
            <Button onClick={handleFormSubmit} />
          </div>
          </form>
      </form>
      {isTraining && <div><Loading /></div>}
    </div>
    </div>
  );
};

export default HyperparameterTuning;
