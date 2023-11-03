import React, { useEffect, useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";
import { FaMicrophone } from "react-icons/fa";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [voiceSearchTerm, setVoiceSearchTerm] = useState("");
  const [recommededBooks, setRecommededBooks] = useState([]);
  const handleButtonClick = (buttonLabel) => {
    console.log(`Button ${buttonLabel} clicked`);
  };

  const handleSearchClick = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardButtonClick = (key) => {
    setSearchTerm(searchTerm + key);
  };

  const keyboardKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<",
    ">",
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const onClickHandlerSetVoiceInput = () => {
    setVoiceSearchTerm(transcript);
  };
  useEffect(() => {
    setSearchTerm(voiceSearchTerm);
  }, [voiceSearchTerm]);
  const onClickHandlerMic = () => SpeechRecognition.startListening;
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function handleSubmit(event) {
    setRecommededBooks([]);
    setSearchTerm("");
    event.preventDefault();
  
    // Make an HTTP POST request to your Flask API
    fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchTerm }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecommededBooks(data);
  
        // Use speech synthesis to speak the result
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance("Here are your results from Libro");
        synth.speak(utterance);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  return (
    <div className="robot-screen">
      {/* <Dictaphone /> */}

      <h1 className="header2"> Libro: The Library Assistant </h1>
      <br />
      <br />
      {listening ? (
        <p className="pgreen">Currently Speaking: {transcript}</p>
      ) : (
        <></>
      )}
      <div className="button-row">
        <button
          className="button"
          onClick={() => handleButtonClick("Button 1")}
        >
          Tutorial
        </button>
        <button
          className="button"
          onClick={() => handleButtonClick("Button 2")}
        >
          Search Books
        </button>
        <button
          className="button"
          onClick={() => handleButtonClick("Button 3")}
        >
          More Information
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleSearchClick}
          placeholder="Ask me a question..."
        />

        <FaMicrophone
          onClick={SpeechRecognition.startListening}
          className="voice-icon"
        />

        {/* <button
          className="btngood"
          onClick={() => {
            onClickHandlerSetVoiceInput();
          }}
        > */}
        {/* <button className="button_1" onClick={handleSubmit}> */}
        <button
          className="button_1"
          onClick={(e) => {
            onClickHandlerSetVoiceInput();
            handleSubmit(e);
            return SpeechRecognition.startListening;
          }}
        >
          Submit
        </button>
        {/* </button> */}
        {/* </button> */}
        <button className="button_1" onClick={resetTranscript}>
          Reset
        </button>
      </div>
      {isKeyboardVisible && (
        <div className="keyboard">
          {keyboardKeys.map((key) => (
            <button
              className="keyboard-button"
              key={key}
              onClick={() => handleKeyboardButtonClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      )}

      {recommededBooks.length === 0 ? (
        <></>
      ) : (
        recommededBooks.map((book) => {
          return (
            <>
              
              <h1>{book["Title"]}</h1>
              <h3>{book["Authors"]}</h3>
            </>
          );
        })
      )}
    </div>
  );
};

export default App;
