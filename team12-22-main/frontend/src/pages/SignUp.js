import React, { useState } from "react";
import { postData } from "../api/PostRequest.js";
import { isAuth } from "../api/IsAuthenticated";
import { Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/SignUp.css";
import LoggedInGuard from "../api/LoggedInGuard";
import Narrator from "../api/ScreenReader.js";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";

// import './index.js'
const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function SignUp() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [username1, setUsername1] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  ScreenReaderHandler();

  const [checkbox1, setCheckbox1] = useState( { id: "C1", text:"test",isChecked: false });
  const [checkbox2, setCheckbox2] = useState( { id: "C2", text:"test",isChecked: false });



  
  // Makes this view inaccessible if the use is not logged in
  LoggedInGuard('/', true);

  //get cookie

  //set the variables
  function changeField(event) {
    const value = event.target.value;

    // alert(event.target.name);
    // alert(value);

    switch (event.target.name) {
      case "username": {
        setUsername(value);
        break;
      }
      // case "username1": {
      //   setUsername1(value);
      //   break;
      // }
      case "email": {
        setEmail(value);
        break;
      }
      // case "password": {
      //   setPassword(value);
      //   break;
      // }
      case "password1": {
        setPassword1(value);
        break;
      }
      case "password2": {
        setPassword2(value);
        break;
      }
      default: {
        break;
      }
    }
  }


  //send the request to the form
  function submitSignUp(event) {
    event.preventDefault();
    if (
      username !== null &&
      email !== null &&
      password1 !== null &&
      password2 !== null
    ) {
      if (password1 === password2) {
        const body = JSON.stringify({ username, email, password1, password2 });
        postData(body, "api/sign-up/").then((res) => {
          if (res.success) {
            // The user has been accepted, redirect to the homepage
            window.location.assign(`${API_URL}`);
          } else {
            // Alert as to what the issue is
            alert(res.details);
          }
        });
      } else {
        //passwords don't match
        alert("The passwords you have entered don't match");
      }
    } else {
      //fields not complete
      alert("Please fill out all the fields");
    }

    // if (username1 !== null && password !== null) {
    //   const body = JSON.stringify({ username, password });
    //   postData(body, "api/login/").then((res) => {
    //     if (res.success) {
    //       // the user has logged in
    //       navigate("/");
    //     } else {
    //       alert(res.details);
    //     }
    //   });
    // } else {
    //   alert("Please fill out the required fields");
    // }
  }

  function submitLogIn(event) {
    event.preventDefault();
    if (username !== null && password1 !== null) {
      // const body = {
      //   'username': username,
      //   'password': password1
      // };
        const body = JSON.stringify({username, password1})
        postData(body, 'api/login/')
            .then((res) => {
                if (res.success) {
                  // alert("got to this point, u: " + username + "p: " + password1)
                    // the user has logged in
                    window.location.assign(`${API_URL}`);
                } else {
                    alert (res.details)
                }
            })
    } else {
        alert("Please fill out the required fields")
    }
  }

  const handleClick = () => {
    const loginsec = document.querySelector(".login-section");
    loginsec.classList.add("active");
  };

  const handleRemove = () => {
    const loginsec = document.querySelector(".login-section");
    loginsec.classList.remove("active");
  };

  return (
    <div className="fontSize sign-up">
            <div className="ScreenReading">
      <div class="background"></div>
      <div class="container">
        <div class="item">
          <div class="login-title">
            <span className="fontSize" >Welcome to</span>
            <span className="fontSize" >Minsky Lab</span>
          </div>
          <div class="login-slogan fontSize">
          "Democratizing Machine Learning"
          </div>
        </div>
        <div class="login-section">
          <div class="form-box login">
            <form action="" onSubmit={submitLogIn}>
              <h2>Login</h2>
              <div class="input-box">
                <input
                  className="input"
                  type="text"
                  name="username"
                  required
                  onChange={changeField}
                  alt="username input"
                />
                <label className="fontSize">Username</label>
              </div>
              <div class="input-box">
                <input
                  className="input"
                  type="password"
                  name="password1"
                  required
                  onChange={changeField}
                  alt="password input"
                />
                <label className="fontSize">Password</label>
              </div>
              <div class="remember-password">
                <label className="fontSize" for="">
                  <input type="checkbox" id={checkbox1.id} checked={checkbox1.isChecked}  onChange={() => setCheckbox1({ ...checkbox1, isChecked: !checkbox1.isChecked })} onKeyPress={() => document.getElementById(checkbox1.id).click()} alt="checkbox"/>
                  <span className="fontSize" > By checking this box, you agree to our {" "} </span>
                  <span tabIndex="0" onKeyPress={() => document.getElementById("privLink").click()}>
                    <a href="/privacy-policy#title#" target="_blank" tabIndex="-1" id="privLink">
                    privacy policy
                  </a>
                  </span>

                </label>
              </div>
              <button class="btn" type="submit" disabled ={!checkbox1.isChecked} tabIndex="-1">
                <span tabIndex="0">Submit</span>
              </button>
              <div class="create-account fontSize">
                <p>
                  Don't have an account?{" "}
                  <span tabIndex="0" onKeyPress={() => document.getElementById("signUpLink").click()}>
                    <a href="#" className="register-link" onClick={handleClick} id="signUpLink" tabIndex="-1">
                    Sign Up
                  </a>
                  </span>

                </p>
              </div>
            </form>
          </div>
          <div class="form-box register">
            <form action="" onSubmit={submitSignUp}>
              <h2 className="fontSize">Sign Up</h2>
              <div class="input-box">
                <input
                  type="text"
                  className="input"
                  name="username"
                  onChange={changeField}
                  required
                  alt="username input"
                />
                <label className="fontSize">Username</label>
              </div>
              <div class="input-box">
                <input
                  className="input"
                  type="text"
                  name="email"
                  onChange={changeField}
                  required
                  alt="email input"
                />
                <label className="fontSize">Email</label>
              </div>
              <div class="input-box">
                <input
                  className="input"
                  type="password"
                  name="password1"
                  onChange={changeField}
                  required
                  alt="password input 1"
                />
                <label className="fontSize">Password</label>
              </div>
              <div class="input-box">
                <input
                  className="input"
                  type="password"
                  name="password2"
                  onChange={changeField}
                  required
                  alt="password input 2"
                />
                <label className="fontSize"> Repeat Password</label>
              </div>
              <div class="remember-password">
                <label for="">
                  <input type="checkbox" id={checkbox2.id} checked={checkbox2.isChecked}  onChange={() => setCheckbox2({ ...checkbox2, isChecked: !checkbox2.isChecked })} alt="checkbox"/>By checking this box, you agree to our {" "}
                  <a href="/privacy-policy#title" target="_blank">
                  <span className="fontSize" tabIndex="0"> privacy policy </span>
                  </a>                  
                </label>
              </div>
              <button class="btn" type="submit" disabled ={!checkbox2.isChecked} tabIndex="-1">
                <span tabIndex="0">
                  Submit
                </span>
              </button>
              <div class="create-account fontSize">
                <p>
                  Already have an account?{" "}
                  <a href="#" class="login-link" onClick={handleRemove}>
                  <span className="fontSize" tabIndex="0">Login</span>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='footer'>
        <p className='footer-desc'>
          Copyright © 2023 Minsky Lab All Rights Reserved.
        </p>
        <div className='footer-content1'>
          <Link to="/privacy-policy#title" target='_blank' style={{ margin: '0 10px' }}>
            <span className=""> Privacy Policy </span>
          </Link>
          ·
          <Link to="/privacy-policy#Cookies" target='_blank' style={{ margin: '0 10px' }}>
          <span className=""> Use of Cookies </span>
          </Link>
          ·
          <Link to="/privacy-policy#Contact" target='_blank' style={{ margin: '0 10px' }}>
          <span className=""> Contact Us </span>
          </Link>
        </div>
        <p className='footer-content2'>Alpha Project Disclaimer: This server is provided by the School of Computer Science at 
        the University of Birmingham to allow users to provide feedback on software developed by 
        students as part of an assignment. While we take reasonable precautions, we cannot 
        guarantee the security of the data entered into the system. Do NOT enter any real 
        personal data (e.g. financial information or otherwise) into the system. The assignment 
        runs until May 31st 2023, at which time the server and all associated data will be destroyed.
        </p>
      </div>
      </div>
      {/* <div className="sign-box">
          <h1 className="heading">Sign Up</h1>
          <form className="form" onSubmit={submitForm}>
            <label className="label">
              Username
              <input
                className="input"
                type="text"
                name="username"
                onChange={changeField}
              />
            </label>
            <label className="label">
              Email
              <input
                className="input"
                type="text"
                name="email"
                onChange={changeField}
              />
            </label>
            <label className="label">
              Password
              <input
                className="input"
                type="text"
                name="password1"
                onChange={changeField}
              />
            </label>
            <label className="label">
              Repeat Password
              <input
                className="input"
                type="text"
                name="password2"
                onChange={changeField}
              />
            </label>
            <p>
              Already have an account?{" "}
              <a className="login-link" href="/login">
                Login
              </a>
            </p>
            <button type="submit" className="submitButton">
              Sign Up
            </button>
          </form>
        </div> */}
    </div>
  );
}
