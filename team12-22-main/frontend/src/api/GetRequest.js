// This file is used when a process needs to make an API GET call to the webapp

// Usage:
// import { getData } from path_to_this_file;
// getData(url).then((res) => { ...

// This function returns a Promise of the JSON parsed data from the backend

const API_URL = process.env.REACT_APP_API_BASE_URL;

export function getData(url) {
    return fetch(`${API_URL}${url}`)
        .then((resp) => {
            return resp.json();
        })
}