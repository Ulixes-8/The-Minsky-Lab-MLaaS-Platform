import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App.js";
import DataUpload from "./pages/DataUpload";
import DataProcessing from "./pages/DataProcessing.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Footer from "./component/Footer/index.js";
import SignUp from "./pages/SignUp.js";
import InformationPage from "./pages/InformationPage.js";
import LogIn from "./pages/LogIn.js";
import LogOut from "./pages/LogOut.js";
// import MyModels from "./pages/MyModels.js";
import HyperparameterTuning from "./pages/HyperparameterTuning.js";
import TrainingAndEvaluation from "./pages/TrainingAndEvaluation.js";
import MyLab from "./pages/MyLab.js";
import NotFoundPage from "./pages/404Page";
import Accessibility from "./component/Accessibility/accessibility"
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import {isAuth} from "./api/IsAuthenticated";


window.reader = false;

document.addEventListener('focusin', () => {
  const element = document.activeElement;
  const text = (element.textContent === "" ? element.alt : element.textContent);
  console.log("focus " + text);
  const SpeechGen = (term, txt) => {
    if (window.reader) {
      console.log(term + " " + txt);
      const speak = new SpeechSynthesisUtterance(term + " " + txt);
      window.speechSynthesis.speak(speak);
    }
  }
  const SelectedListener = () => {
    SpeechGen("Selected ", text);
  }

  function eventHandler(event) {
    if (event.detail !== 0) {
      SpeechGen("Selected ", text);
    }
  }

  console.log("called");

  SpeechGen("Focused", text);

  element.removeEventListener("click", eventHandler);
  element.removeEventListener("keypress", () => SelectedListener());


  element.addEventListener("click", eventHandler);
  element.addEventListener("keypress", () => SelectedListener());
  element.addEventListener("focusout", () => {
    element.removeEventListener("click", eventHandler);
    element.removeEventListener("keypress", () => SelectedListener());
    console.log("FOCUS OUT");
  })
});

// document.addEventListener('click', () => {
//   console.log("selected")
// })


isAuth().then((logged) => {
  Routing(logged);
    })
    .catch((error) => {
      Routing(true);
    });


function Routing(logged) {
  ReactDOM.render(
      <React.StrictMode>
        <Router>
          <Routes>
            <Route exact path="/login" element={!logged ? <SignUp/> : <Navigate replace to={"/"} />}/>
            <Route exact path="/logout" element={logged ? <><LogOut/><Footer /></> : <Navigate replace to={"/login"} />}/>
            <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>

            <Route exact path="/" element={logged ? <><App/><Footer /></> : <Navigate replace to={"/login"} />} />
            <Route exact path="/dataupload" element={logged ? <><DataUpload/><Footer /></> : <Navigate replace to={"/login"} />}/>
            <Route exact path="/data-processing" element={logged ? <><DataProcessing/><Footer /></> : <Navigate replace to={"/login"} />}/>
            <Route exact path="/informationpage" element={<><InformationPage/><Footer /></>}/>
            <Route exact path="/hyperparameter-tuning" element={logged ? <><HyperparameterTuning/><Footer /></> : <Navigate replace to={"/login"} />}/>
            <Route exact path="/training" element={logged ? <><TrainingAndEvaluation/><Footer /></> : <Navigate replace to={"/login"} />}/>
            <Route exact path="/mylab" element={logged ? <><MyLab/><Footer /></> : <Navigate replace to={"/login"} />}/>

            <Route exact path="/users/sign-up" element={<SignUp/>}/>

            <Route path="*" element={<><NotFoundPage/><Footer /></>}/>
          </Routes>
          {/*{!window.location.href.includes("/privacy-policy") && !window.location.href.includes("/login") ?*/}
          {/*    <Footer/> : null}*/}
          {!window.location.href.includes("/privacy-policy") ? <Accessibility/> : null}
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
);
}