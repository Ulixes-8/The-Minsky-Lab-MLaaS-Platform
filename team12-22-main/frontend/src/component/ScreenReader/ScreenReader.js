import React, { useEffect } from "react";
import { useState } from 'react';
import ScreenReaderRunner from "./ScreenReaderRunner";

export default function ScreenReader() {
    const [isReading, setIsReading] = useState(window.reader);
    const [isPaused, setIsPaused] = useState(false);

    function readAloud() {

        // const text = document.querySelector('#block').innerText;
        // const speech = new SpeechSynthesisUtterance(text);
        // window.speechSynthesis.speak(speech);

        window.reader = true;
        setIsReading(true);
        setIsPaused(false);

        ScreenReaderRunner();
    }

    function stopReading() {
        console.log("stiop")
        window.reader = false;
        setIsPaused(false);
        setIsReading(false);
        const textElement = document.querySelector(".ScreenReading");
        if (textElement !== null) {
            const text = textElement.textContent;
            // speakText(text);
            const stop = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.cancel(stop);
        } else {
            console.log("Page text element not found");
        }
    }

    function handlePauseResume() {
        if (!isPaused) {
            window.speechSynthesis.pause();
        } else {
            window.speechSynthesis.resume();
        }
        setIsPaused(!isPaused);
    }


    return (
        <>
            <li>
                <button className="accesslist-button" id="read-aloud" onClick={() => {
                    if (isReading) {
                        stopReading();
                    } else {
                        readAloud();
                    }
                }}>{isReading ? "Stop Reading" : "Start Reading"}</button>
            </li>
            {isReading ? (
                <li>
                    <button className="accesslist-button" id="pause-reading" onClick={handlePauseResume}>{isPaused ? "Resume Reading" : "Pause Reading"}</button>
                </li>
            ) : null}
        </>
    )
}