import React, { useEffect } from "react";
import { useState } from 'react';

export default function PauseResume(className) {

    const PauseReading = ({ onClick, paused }) => (
        <div className="screenReaderPause" id="pause-reading" onClick={onClick}>
            <span className="text">{paused ? 'Resume Reading' : 'Pause Reading'}</span>
        </div>
    );
    const [isPaused, setIsPaused] = useState(false);

    function handlePauseResume() {
        if (!isPaused) {
            window.speechSynthesis.pause();
        } else {
            window.speechSynthesis.resume();
        }
        setIsPaused(!isPaused);
    }

    // useEffect(() => {
    //     const pauseReadingButton = document.querySelector('#pause-reading');
    //     pauseReadingButton.addEventListener('click', handlePauseResume);
    //
    //     return () => {
    //         pauseReadingButton.removeEventListener('click', handlePauseResume);
    //     };
    // }, [handlePauseResume]);

    return (
        <>
            <PauseReading onClick={handlePauseResume} paused={isPaused} />
        </>
    )
}

