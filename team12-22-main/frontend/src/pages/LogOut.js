import React, { useState } from "react";
import { postData } from '../api/PostRequest.js';
import { isAuth } from '../api/IsAuthenticated';
import { Route, useNavigate } from "react-router-dom";
import '../css/Logout.css'
import LoggedInGuard from "../api/LoggedInGuard";
import TopHeader from "../component/TopHeader/index.js";
import Narrator from "../api/ScreenReader.js";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function SignUP() {
    const navigate = useNavigate();
    ScreenReaderHandler();

    const Button = ({ onClick }) => (
        <button className="button" href="#" onClick={onClick} tabIndex="-1" id="logoutConfirmButton">
            <span className="text" tabIndex="0" onKeyPress={() => document.getElementById("logoutConfirmButton").click()}>Confirm Logout</span>
        </button>
    );

    LoggedInGuard('/login', false);

    function submitForm(event) {
        event.preventDefault();
        postData({}, 'api/logout/')
            .then((res) => {
                if (res.success) {
                    // navigate('/login');
                    window.location.assign(`${API_URL}login`);
                } else {
                    alert(res.details);
                }
            })
    }

    return (
        <div className="logoutpage">
            <TopHeader />
            <div className="container ScreenReading">
                <h1 className="heading">Do you want to logout?</h1>
                <form onSubmit={submitForm}>
                    <Button onClick={() => submitForm()} />
                </form>

            </div>
        </div>

    )
    // () => navigate("/sign-up")
}