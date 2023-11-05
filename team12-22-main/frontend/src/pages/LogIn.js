import React, {useState} from "react";
import { postData } from '../api/PostRequest.js';
import { isAuth } from '../api/IsAuthenticated';
import { Route, useNavigate } from "react-router-dom";
import "../css/LogIn.css";
import LoggedInGuard from "../api/LoggedInGuard";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function LogIn() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    LoggedInGuard('/', true);
    ScreenReaderHandler();

    function changeField(event) {
        const value = event.target.value;

        switch(event.target.name) {
            case "username": {
                setUsername(value);
                break;
            }
            case "password": {
                setPassword(value);
                break;
            }
        }
    }

    function submitForm(event) {
        event.preventDefault();
        if (username !== null && password !== null) {
            const body = JSON.stringify({username, password})
            postData(body, 'api/login/')
                .then((res) => {
                    if (res.success) {
                        // the user has logged in
                        window.location.assign(`${API_URL}`);
                        // navigate('/');
                    } else {
                        alert (res.details)
                    }
                })
        } else {
            alert("Please fill out the required fields")
        }
    }

    return (
        
        <div className="container">
            <div className="ScreenReading">
            <div className="login-box">
                <h1 className="fontSize heading">Login</h1>
                <form className="form" onSubmit={submitForm}>
                    <label className="label fontSize">
                        Username
                        <input
                            className="input"
                            type="text"
                            name="username"
                            onChange={changeField}
                        />
                    </label>
                    <label className="label fontSize">
                        Password
                        <input
                            className="input"
                            type="text"
                            name="password"
                            onChange={changeField}
                        />
                    </label>
                    <p className="fontSize">
                    Don't have an account? <a className="signup-link" href="/sign-up"><span className="fontSize"> Sign up </span> </a>
                    </p>
                    <input className="submitButton" type="submit" value="submit" />
                </form>
            </div>
        </div>
        </div>
    );
    
}