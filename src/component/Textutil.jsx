import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PropTypes from "prop-types";

export default function Textutil(props) {
  const { mode } = props;
  const [listening, setListening] = useState(false);

  const [message, setMessage] = useState("");

  const [text, setText] = useState("");

  let { transcript, resetTranscript } = useSpeechRecognition();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const msg = (m) => {
    setMessage(m);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const clearText = () => {
    setText("");
    resetTranscript();
    msg("Text Cleared.");
  };
  const toUpperCase = () => {
    setText(text.toUpperCase());
    msg("Text converted to upper case.");
  };
  const toLowerCase = () => {
    setText(text.toLowerCase());
    msg("Text converted to lower case.");
  };
  const copyText = () => {
    navigator.clipboard.writeText(text);
    msg("Text Copied.");
  };
  const removeExtraSpace = () => {
    setText(text.split(/[ ]+/).join(" "));
    msg("Extra space removed.");
  };
  const pasteText = async () => {
    setText(await navigator.clipboard.readText());
    msg("Text pasted.");
  };
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    msg("Mic on.");
  };

  const handleMicrophone = () => {
    if (!listening) {
      setListening(true);
      startListening();
    } else {
      setListening(false);
      setText(transcript);
      SpeechRecognition.stopListening();
      msg("Mic off");
    }
  };

  const [isPause, setIsPause] = useState(false);
  const [utterance, setUtterance] = useState(null);
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const readText = () => {
    const synth = window.speechSynthesis;
    if (isPause) synth.resume();

    synth.speak(utterance);
    setIsPause(false);
  };

  const stopReading = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPause(false);
  };
  const pauseReading = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPause(true);
  };
  return (
    <div
      className={`px-[10vw] bg-${
        mode === "light" ? "white" : "[#222831]"
      } pb-[10vh]`}
    >
      <div className="w-full h-[2.5rem] pt-[0.4rem] flex justify-center">
        <div
          className={`${
            message.length === 0 ? "hidden" : "block"
          } p-[0.3rem] bg-green-200 border-green-700 border-[1px] rounded-md w-[15rem]`}
        >
          {message}
        </div>
      </div>
      <h1
        className={`text-2xl font-bold font-[Montserrat] pb-[2vh] text-${
          mode === "light" ? "black" : "white"
        }`}
      >
        {" "}
        Enter text below to utilize
      </h1>

      <div>
        <textarea
          name=""
          value={listening ? transcript : text}
          onChange={handleText}
          rows="12"
          className={`w-full border-[1px] border-${
            mode === "light" ? "black" : "white"
          } font-[Montserrat] p-[0.4rem] text-${
            mode === "light" ? "black" : "white"
          } text-lg mb-[2vh] bg-${mode === "light" ? "white" : "[#222831]"}`}
        />
        <div
          className="absolute translate-y-[-7vh] sm:translate-y-[-10vh] sm:translate-x-[75vw] translate-x-[70vw] xl:translate-x-[76vw] cursor-pointer"
          onClick={handleMicrophone}
        >
          <i
            className={`fa-solid fa-microphone${
              !listening ? "" : "-slash"
            } text-[1.8rem] text-${mode === "light" ? "black" : "white"}`}
          ></i>
        </div>
      </div>

      <div>
        <button
          disabled={text.length === 0}
          onClick={clearText}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          ClearText
        </button>
        <button
          disabled={text.length === 0}
          onClick={toUpperCase}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          ToUpperCase
        </button>
        <button
          disabled={text.length === 0}
          onClick={toLowerCase}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          ToLowerCase
        </button>
        <button
          disabled={text.length === 0}
          onClick={copyText}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          Copy
        </button>
        <button
          disabled={text.length === 0}
          onClick={removeExtraSpace}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          RemoveExtraSpace
        </button>
        <button
          onClick={pasteText}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black 
        bg-${mode === "light" ? "black" : "[#DDDDDD]"} text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          Paste
        </button>
        <button
          disabled={text.length === 0}
          onClick={readText}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          Read
        </button>
        <button
          disabled={text.length === 0}
          onClick={stopReading}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          Stop Reading
        </button>
        <button
          disabled={text.length === 0}
          onClick={pauseReading}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          Pause Reading
        </button>
      </div>

      <p className={`my-[1.2rem] text-${mode === "light" ? "black" : "white"}`}>
        Words{" "}
        {
          text.split(/\s+/).filter((element) => {
            return element.length !== 0;
          }).length
        }{" "}
        Charecters {text.length}
      </p>
      <p className={`my-[1.2rem] text-${mode === "light" ? "black" : "white"}`}>
        {text.split(/\s+/).filter((element) => {
          return element.length !== 0;
        }).length * 0.008}{" "}
        Minutes required to read.
      </p>
      <h1
        className={`text-2xl font-bold font-[Montserrat] my-[2vh] text-${
          mode === "light" ? "black" : "white"
        }`}
      >
        {" "}
        Text Preview
      </h1>
      <p
        className={`font-[Montserrat] text-${
          mode === "light" ? "black" : "white"
        }`}
      >
        {text.length === 0 ? "Nothing to preview." : text}
      </p>
    </div>
  );
}

Textutil.propTypes = {
  mode: PropTypes.string.isRequired,
};
