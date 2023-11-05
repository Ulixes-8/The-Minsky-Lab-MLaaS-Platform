import React, { useEffect } from "react";
import { useState } from 'react';

export default function StartReading(className) {

    const NarratorComp = ({ onClick, className }) => (
        <div className="screenReader" id="read-aloud" onClick={onClick}>
            <span className="text">Read Aloud</span>
        </div>
    );

    function readAloud() {

        // const text = document.querySelector('#block').innerText;
        // const speech = new SpeechSynthesisUtterance(text);
        // window.speechSynthesis.speak(speech);

        window.reader = true;

        const textElement = document.querySelector(className.className);
        if (textElement !== null) {
            const text = textElement.textContent;

            const voices = window.speechSynthesis.getVoices();
            // find the voice you want to use (e.g. a female voice with a more natural tone)
            const voice = voices.find(voice => voice.name === 'Google UK English Female');

            // set the voice of the SpeechSynthesisUtterance object

            // speakText(text);
            const speech = new SpeechSynthesisUtterance(text);
            // speech.voice = voice;
            speech.onerror = function (event) { // Add an onerror listener
                console.error(`Error occurred: ${event.error}`);

            }
            console.log(text);

            window.speechSynthesis.speak(speech);
        }

        else {
            console.log("Page text element not found");
        }
    }

    // useEffect(() => {
    //     console.log('useEffect called');
    //     const readAloudButton = document.querySelector('#read-aloud');
    //     readAloudButton.addEventListener('click', readAloud);
    //
    //     return () => {
    //         readAloudButton.removeEventListener('click', readAloud);
    //     };
    // }, [readAloud]);

    return (
        <>
            <NarratorComp onClick={readAloud} />
        </>
    )
}