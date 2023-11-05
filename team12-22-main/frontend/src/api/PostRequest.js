import { getCookie } from "./CSRFCookie.js";

// This file is used when a process needs to make an API POST call to the webapp

// Usage:
// import { postData } from path_to_this_file;
// postData(body, url).then((res) => { ...

// This function returns a Promise of the JSON parsed data from the backend

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Pass the body and sub-URL of the request here
export function postData(body, url) {
    //alert("HERE")
    return fetch(`${API_URL}api/csrf-cookie/`)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            const token = getCookie('csrftoken');
            return fetch(
                `${API_URL}${url}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': token,
                    },
                    body: body,
                }
            )
                .then((response) => {
                    return response.json()
                })
        })
}


