import React, { useEffect } from "react";
import { useState } from 'react';

export default function StopReading(className) {

    const [isPaused, setIsPaused] = useState(false);
    const StopReading = ({ onClick, className }) => (

        <div className="screenReaderStop" id="stop-reading" onClick={onClick}>
            <span className="text">Stop Reading</span>
        </div>
    );

    function stopReading() {
        window.reader = false;
        setIsPaused(false);
        const textElement = document.querySelector(className.className);
        if (textElement !== null) {
            const text = textElement.textContent;
            // speakText(text);
            const stop = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.cancel(stop);
        } else {
            console.log("Page text element not found");
        }
    }

    useEffect(() => {
        console.log('useEffect called')
        const stopReadingButton = document.querySelector('#stop-reading');
        stopReadingButton.addEventListener('click', stopReading);

        return () => {
            stopReadingButton.removeEventListener('click', stopReading);
        };
    }, [stopReading]);

    return (
        <>
            <StopReading onClick={stopReading} />
        </>
    )

}