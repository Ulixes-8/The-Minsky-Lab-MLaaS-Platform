import React, { useEffect } from "react";
import { useState } from 'react';

// Usage:
// Import the file, and then add <Narrator className=""/>, with the class name being the name of a class that
// contains the text to be read aloud on the page.

export default function Narrator(className) {


    const NarratorComp = ({ onClick, className }) => (
        <div className="screenReader" id="read-aloud" onClick={onClick}>
            <span className="top-key"></span>
            {/* <span className="text"><img src=" ./accessibilityMan.png" height="10px" width="10px"/>  </span> */}
            <span className="text">Read Aloud</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </div>
    );
    const PauseReading = ({ onClick, paused }) => (
        <div className="screenReaderPause" id="pause-reading" onClick={onClick}>
            <span className="top-key"></span>
            <span className="text">{paused ? 'Resume Reading' : 'Pause Reading'}</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </div>
    );
    const [isPaused, setIsPaused] = useState(false);
    const StopReading = ({ onClick, className }) => (

        <div className="screenReaderStop" id="stop-reading" onClick={onClick}>
            <span className="top-key"></span>
            <span className="text">Stop Reading</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </div>
    );

    function readAloud() {

        // const text = document.querySelector('#block').innerText;
        // const speech = new SpeechSynthesisUtterance(text);
        // window.speechSynthesis.speak(speech);

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
        function handlePauseResume() {
            if (!isPaused) {
                window.speechSynthesis.pause();
            } else {
                window.speechSynthesis.resume();
            }
            setIsPaused(!isPaused);
        }

        function stopReading() {
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
            console.log('useEffect called');
            const readAloudButton = document.querySelector('#read-aloud');
            readAloudButton.addEventListener('click', readAloud);

            return () => {
                readAloudButton.removeEventListener('click', readAloud);
            };
        }, [readAloud]);

        useEffect(() => {
            const pauseReadingButton = document.querySelector('#pause-reading');
            pauseReadingButton.addEventListener('click', handlePauseResume);

            return () => {
                pauseReadingButton.removeEventListener('click', handlePauseResume);
            };
        }, [handlePauseResume]);

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
                <NarratorComp onClick={readAloud} />
                <StopReading onClick={stopReading} />
                <PauseReading onClick={handlePauseResume} paused={isPaused} />
            </>
        )
    }