import {useState} from "react";
import {useNavigate} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Usage:
// import { isAuth } from path_to_this_file;
// isAuth().then((res) => { ...

// Simple function that will return true if the user is authenticated and false otherwise
export function isAuth() {
    return fetch(`${API_URL}api/user-auth/`)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            return result.auth;
        });
}



