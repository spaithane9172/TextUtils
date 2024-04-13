import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import PropTypes from "prop-types";

export default function Textutil(props) {
  const { mode } = props;
  const [listening, setListening] = useState(false);

  const [text, setText] = useState("");

  let { transcript, resetTranscript } = useSpeechRecognition();

  const handleText = (e) => {
    setText(e.target.value);
  };

  const clearText = () => {
    setText("");
    resetTranscript();
  };
  const toUpperCase = () => {
    setText(text.toUpperCase());
  };
  const toLowerCase = () => {
    setText(text.toLowerCase());
  };
  const copyText = () => {
    navigator.clipboard.writeText(text);
  };
  const removeExtraSpace = () => {
    setText(text.split(/[ ]+/).join(" "));
  };
  const pasteText = async () => {
    setText(await navigator.clipboard.readText());
  };
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const handleMicrophone = () => {
    if (!listening) {
      setListening(true);
      startListening();
    } else {
      setListening(false);
      setText(transcript);
      SpeechRecognition.stopListening();
    }
  };

  const { speak } = useSpeechSynthesis();
  const readText = () => {
    console.log(text);
    speak({ text: text });
  };
  return (
    <div
      className={`px-[10vw] bg-${
        mode === "light" ? "white" : "[#222831]"
      } h-[100vh]`}
    >
      <h1
        className={`text-2xl font-bold font-[Montserrat] py-[2vh] text-${
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
          onClick={readText}
          className={`mb-[1rem] mx-[0.4rem] shadow-md shadow-black bg-${
            mode === "light" ? "black" : "[#DDDDDD]"
          } text-${
            mode === "light" ? "white" : "black"
          } px-[1rem] py-[0.3rem] rounded-md font-bold hover:bg-white hover:text-black hover:border-[1px] hover:border-black`}
        >
          Read
        </button>
      </div>

      <p className={`my-[1.2rem] text-${mode === "light" ? "black" : "white"}`}>
        Words {text.split(" ").length} Charecters {text.length}
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
        {text}
      </p>
    </div>
  );
}

Textutil.propTypes = {
  mode: PropTypes.string.isRequired,
};
