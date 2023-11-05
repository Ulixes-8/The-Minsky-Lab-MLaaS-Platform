import React, { useEffect, useState, useContext } from 'react';
import accessIcon from '../../api/accessibilityMan.png';
import './accessibility.css';
import './greyscale.css';
import './high-contrast.css';
// import Narrator from '../../api/ScreenReader';
// import StartReading from '../ScreenReader/StartReading';
// import PauseResume from '../ScreenReader/PauseResume';
// import StopReading from '../ScreenReader/StopReading';
// import ScreenReaderHandler from "./ScreenReaderHandler";
import ScreenReader from "../ScreenReader/ScreenReader";
import Speak from "../../pages/SpeechRecognition";




const Button = () => {
    // const Reader = useContext(ReaderActive);
    // const {active, setActive} = useContext(ReaderActive);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'accessibility.css';
        document.head.appendChild(css);
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const toggleGreyscale = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains('greyscale')) {
            htmlElement.classList.remove('greyscale');
        } else {
            htmlElement.classList.add('greyscale');
        }
    };

    const toggleHighContrast = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains('high-contrast')) {
            htmlElement.classList.remove('high-contrast');
        } else {
            htmlElement.classList.add('high-contrast');
        }
    };

    return (
        <div className="access-container" title="Accessibility Button">
            {isOpen && (
                <ul className="access-list">
                    <li>
                        <button className="accesslist-button" onClick={() => {
                            const elements = document.querySelectorAll('.fontSize');
                            elements.forEach(element => {
                                const fontSize = parseInt(getComputedStyle(element).fontSize);
                                if (fontSize <= 30)
                                    element.style.fontSize = fontSize + 2 + 'px';
                            });
                        }}>Increase Font Size</button>
                    </li>
                    <li>
                        <button className="accesslist-button" onClick={() => {
                            const elements = document.querySelectorAll('.fontSize');
                            elements.forEach(element => {
                                const fontSize = parseInt(getComputedStyle(element).fontSize);
                                if (fontSize > 12)
                                    element.style.fontSize = fontSize - 2 + 'px';
                            });
                        }}>Decrease Font Size</button>
                    </li>
                    <li><button className="accesslist-button" onClick={toggleGreyscale}>Greyscale</button></li>
                    <li><button className="accesslist-button" onClick={toggleHighContrast}>High Contrast</button></li>
                    <ScreenReader />
                    <Speak />

                    {/*<li> */}
                    {/*    <StartReading className=".ScreenReading" />*/}
                    {/*</li>*/}
                    {/*<li><button className="accesslist-button"><PauseResume className=".ScreenReading" /></button></li>*/}
                    {/*<li><button className="accesslist-button"><StopReading className=".ScreenReading" /></button></li>*/}
                    {/*<li><button onClick={() => console.log(window.reader)}>Test</button></li>*/}
                    {/*<li><button onClick={() => window.reader = true}>Set</button></li>*/}
                </ul>
            )}
            <div className="access-box" onClick={handleClick}>
                <img className="access-icon" src={accessIcon} alt="accessibility icon" />
            </div>
        </div>
    );
};

export default Button;
