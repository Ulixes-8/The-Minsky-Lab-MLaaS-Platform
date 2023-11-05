import React from "react";
import {useNavigate} from "react-router-dom";
import ScreenReaderHandler from "../component/Accessibility/ScreenReaderHandler";

export default function NotFoundPage() {
    const navigate = useNavigate();

    ScreenReaderHandler();

    return (
        <>
            <h1>Page not found</h1>
            <button onClick={() => navigate('/')}>Go Home</button>
        </>
    )
}