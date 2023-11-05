import React, { useEffect, useState } from "react";
import "../css/InformationPage.css";
import TopHeader from "../component/TopHeader/index.js";
import { useNavigate } from 'react-router-dom';
import Footer from "../component/Footer/index.js";
import InformationPageText from "../component/InformationPage/InformationPageText.js"
import BackgroundParticle from "../component/BackgroundParticle/BackgroundParticle.js";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";


function InformationPage() {
    ScreenReaderHandler();


    return (
        <div className="fontSize InfoPage">
            <BackgroundParticle>
            </BackgroundParticle>
            <TopHeader />
            <div className="ScreenReading">
                <InformationPageText />
            </div>
        </div>
    )

}
export default InformationPage;
