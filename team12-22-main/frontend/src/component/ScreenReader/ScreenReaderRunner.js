export default function ScreenReaderRunner() {
    if (window.reader) {
        const textElement = document.querySelector(".ScreenReading");
        if (textElement !== null) {
            const text = textElement.textContent;

            // set the voice of the SpeechSynthesisUtterance object

            // speakText(text);
            const speech = new SpeechSynthesisUtterance(text);
            speech.onerror = function (event) { // Add an onerror listener
                console.error(`Error occurred: ${event.error}`);

            }
            console.log(text);

            window.speechSynthesis.speak(speech);

            const altArray = Array.from(textElement.querySelectorAll("img")).map(e => e.alt);
            if (altArray.length !== 0) {
                const alts = "The image alts are: " + altArray.toString();
                const speech2 = new SpeechSynthesisUtterance(alts);
                window.speechSynthesis.speak(speech2)
            }
        }

        else {
            console.log("Page text element not found");
        }
    }
}

