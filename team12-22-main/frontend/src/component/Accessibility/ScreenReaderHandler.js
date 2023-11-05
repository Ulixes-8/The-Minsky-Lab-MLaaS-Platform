import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import ScreenReaderRunner from "../ScreenReader/ScreenReaderRunner";

export default function ScreenReaderHandler() {
    const location = useLocation();

    useEffect(() => {
        ScreenReaderRunner();
    }, [location]);
}