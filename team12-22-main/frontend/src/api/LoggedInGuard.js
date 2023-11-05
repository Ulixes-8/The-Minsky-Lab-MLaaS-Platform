import { isAuth } from "./IsAuthenticated";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

// Usage:
// import { LoggedInGuard } from path_to_this_file;
// LoggedInGuard (url, mode);
// Where "url" is the url that the user should be redirected to.
// Where "mode" is whether the user should be redirected when logged-in, or logged-out.
// When true, the user will be redirected when logged-in.

// This is a function that adds an event listener to the window, and can be used to protect certain pages from
// logged-in or logged-out users as required.

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function LoggedInGuard (url, loggedInMode) {
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     isAuth()
    //         .then((result) => {
    //             if (url.startsWith('/')) {
    //                 url = url.substring(1, url.length);
    //             }
    //
    //             if (loggedInMode && result) {
    //                 window.location.assign(`${API_URL}${url}`);
    //             }
    //             if (!loggedInMode && !result) {
    //                 window.location.assign(`${API_URL}${url}`);
    //             }
    //         })
    // });
}