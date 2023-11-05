import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { render } from "react-dom";
import { isAuth } from "../api/IsAuthenticated.js";
import TopHeader from "../component/TopHeader/index.js";
import MinskyLab from "../component/MinskyLab/index.js";
import Terrain from "../component/TerrainGenerator/Terrain.js";
//import p5 from "../component/TerrainGenerator/p5.min.js";
import Footer from "../component/Footer/index.js";
import "../css/App.css";
import LoggedInGuard from "../api/LoggedInGuard";
// import SpeechRecognition from './SpeechRecognition';
import Narrator from "../api/ScreenReader";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";


const API_URL = process.env.REACT_APP_API_BASE_URL;

const Button = ({ onClick }) => (
    <div className="fancy" href="#" onClick={onClick} id="to-dataupload" >
        <span className="top-key"></span>
        <span className="text" tabIndex="0" onKeyPress={onClick}>Build a Model</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
    </div>
);

function App() {
    const [auth, setAuth] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    ScreenReaderHandler();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        scrollToTop();
    }, [location]);

    // LoggedInGuard("/login", false);

    // window.addEventListener("load", (event) => {
    //     isAuth()
    //         .then((result) => {
    //             if (!result) {
    //                 navigate('/login')
    //             }
    //         })
    // })

    // console.log(API_URL);
    //
    // useEffect(() => {
    //     fetch(`${API_URL}api/user-auth/`)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setIsLoaded(true);
    //                 setAuth(result.auth)
    //                 setItems(result);
    //             },
    //             (error) => {
    //                 setIsLoaded(true);
    //             }
    //         )
    // }, [])
    //
    // // window.addEventListener("load", (event) => {
    // //     isAuth()
    // //         .then((result) => {
    // //             if (result) {
    // //                 setIsLoaded(true);
    // //             } else {
    // //                 navigate('/login')
    // //             }
    // //         })
    // // })
    //
    //
    // if (!auth) {
    //     navigate("/login");
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {//}
    return (
        <div className="App">
            <TopHeader />
            <div className="ScreenReading">
                <div className="tet">
                    {/*<SpeechRecognition />*/}
                    <MinskyLab />
                    <div className="model">
                        <Button onClick={() => navigate("/dataupload")} />
                    </div>
                    <div className="terrain">
                        <Terrain />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

