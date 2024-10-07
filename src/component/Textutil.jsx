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
  let voices = window.speechSynthesis.getVoices();
  const [readSpeed, setReadSpeed] = useState(1);
  const [voice, setVoice] = useState(voices[0]);
  const [speakerIcon, setSpeakerIcon] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [utterance, setUtterance] = useState(null);
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.rate = readSpeed;
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text, voice, readSpeed]);

  const readText = () => {
    setSpeakerIcon(speakerIcon ? false : true);
    const synth = window.speechSynthesis;
    if (isPause) {
      synth.resume();
      setSpeakerIcon(false);
    }
    synth.language = "zh-CN";
    synth.speak(utterance);
    setIsPause(false);
    if (!synth.pending) setSpeakerIcon(true);
  };

  const stopReading = () => {
    setSpeakerIcon(true);
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPause(false);
  };
  const pauseReading = () => {
    setSpeakerIcon(speakerIcon ? false : true);
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPause(true);
  };
  const [showCharCaseDropDown, setShowCharCaseDropDown] = useState("hidden");
  const showCharCase = () => {
    setShowCharCaseDropDown(
      showCharCaseDropDown === "hidden" ? "block" : "hidden"
    );
  };

  const [showAccentDropDown, setShowAccentDropDown] = useState("hidden");
  const showAccent = () => {
    setShowAccentDropDown(showAccentDropDown === "hidden" ? "block" : "hidden");
  };

  const changeVoice = (e) => {
    setVoice(voices[e.target.name]);
  };

  const changeSpeed = (e) => {
    setReadSpeed(e.target.value);
    console.log(e.target.value);
  };

  const downloadTextFile = () => {
    const blob = new Blob([text], { type: "text" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "TextUtiles";
    link.href = url;
    link.click();
  };

  return (
    <div
      className={`pt-[3rem] md:pt-[5rem] px-[10vw] bg-${
        mode === "light" ? "white" : "[#222831]"
      } pb-[10vh]`}
    >
      <div className="w-full h-[2.5rem] pt-[0.4rem] flex justify-center">
        <div
          className={`${
            message.length === 0 ? "hidden" : "block"
          } p-[0.3rem] bg-green-200 border-green-700 border-[1px] rounded-md w-[15rem] text-center`}
        >
          {message}
        </div>
      </div>
      {/* <h1
        className={`text-2xl font-bold font-[Montserrat] pb-[2vh] text-${
          mode === "light" ? "black" : "white"
        }`}
      >
        {" "}
        Enter text below to utilize
      </h1> */}

      <div
        className={`border-${
          mode === "light" ? "black" : "white"
        }  border-[1px]`}
      >
        <textarea
          placeholder="Enter Text"
          name=""
          value={listening ? transcript : text}
          onChange={handleText}
          rows="12"
          className={`w-full font-[Montserrat] p-[0.4rem] text-${
            mode === "light" ? "black" : "white"
          } text-lg bg-${
            mode === "light" ? "white" : "[#222831]"
          } outline-none`}
        />

        <div
          className={`border-t-[1px] border-${
            mode === "light" ? "black" : "white"
          }  bg-${
            mode === "light" ? "gray-100" : "[#546278]"
          } flex-wrap lg:flex lg:justify-between`}
        >
          <div className="border-[1px] border-b-gray-500 lg:border-0">
            <button
              className={`py-[0.5rem] px-[1rem] font-semibold text-[0.9rem] md:text-[1.2rem] border-r-[1px] border-gray-500 cursor-pointer text-${
                mode === "light" ? "black" : "white"
              }`}
              title="Clear Text"
              disabled={text.length === 0}
              onClick={clearText}
            >
              C
            </button>

            <button
              className={`outline-none bg-transparent font-semibold text-[0.9rem] md:text-[1.2rem] inline-block cursor-pointer text-${
                mode === "light" ? "black" : "white"
              }`}
              title="Case"
              onClick={showCharCase}
            >
              <div
                className="py-[0.5rem] px-[1rem] border-r-[1px] border-gray-500"
                title="Change Case"
              >
                Aa <i className="fa-solid fa-angle-down text-[0.8rem]"></i>
              </div>

              <div
                className={`${showCharCaseDropDown}  absolute  bg-${
                  mode === "light" ? "gray-100" : "[#546278]"
                } border-[1px] border-gray-500 border-t-0 rounded-b-md text-${
                  mode === "light" ? "black" : "white"
                }`}
              >
                <div>
                  <button
                    className="py-[0.5rem] px-[1rem] text-[1rem] cursor-pointer"
                    title="Clear Text"
                    disabled={text.length === 0}
                    onClick={toLowerCase}
                  >
                    lowercase
                  </button>
                </div>
                <div>
                  <button
                    className="py-[0.5rem] px-[1rem] text-[1rem] cursor-pointer"
                    title="Clear Text"
                    disabled={text.length === 0}
                    onClick={toUpperCase}
                  >
                    UPPERCASE
                  </button>
                </div>
              </div>
            </button>
            <button
              className={`py-[0.5rem] px-[1rem] font-semibold text-[0.9rem] md:text-[1.2rem] border-r-[1px] border-gray-500 cursor-pointer text-${
                mode === "light" ? "black" : "white"
              }`}
              title="Copy Text"
              disabled={text.length === 0}
              onClick={copyText}
            >
              <i className="fa-regular fa-copy"></i>
            </button>

            <button
              className={`py-[0.5rem] px-[1rem] font-semibold text-[0.9rem] md:text-[1.2rem] border-r-[1px] border-gray-500 cursor-pointer text-${
                mode === "light" ? "black" : "white"
              }`}
              title="Paste"
              onClick={pasteText}
            >
              <i className="fa-regular fa-paste"></i>
            </button>

            <button
              className={`py-[0.5rem] px-[1rem] font-semibold text-[0.9rem] md:text-[1.2rem] border-r-[1px] border-gray-500 cursor-pointer text-${
                mode === "light" ? "black" : "white"
              }`}
              title="Remove Extra Space"
              disabled={text.length === 0}
              onClick={removeExtraSpace}
            >
              RES
            </button>

            <button
              className={`py-[0.5rem] px-[1rem] font-semibold text-[0.9rem] md:text-[1.2rem] border-r-[1px] border-gray-500 cursor-pointer text-${
                mode === "light" ? "black" : "white"
              }`}
              title="Download Text File"
              disabled={text.length === 0}
              onClick={downloadTextFile}
            >
              <i className="fa-solid fa-download"></i>
            </button>
          </div>

          <div className="flex-wrap md:flex items-center sm:px-[0.5rem]">
            <div className="border-[1px] border-b-gray-500 md:border-0">
              <button
                className={`outline-none bg-transparent font-semibold text-[1rem] inline-block cursor-pointer text-${
                  mode === "light" ? "black" : "white"
                }`}
                title="Case"
                onClick={showAccent}
              >
                <div
                  className="py-[0.5rem] px-[0.5rem] md:px-[1rem] border-r-[1px] xl:border-l-[1px] border-gray-500"
                  title="Change Case"
                >
                  Accent{" "}
                  <i className="fa-solid fa-angle-down text-[0.8rem]"></i>
                </div>

                <div
                  className={`${showAccentDropDown}  absolute bg-${
                    mode === "light" ? "gray-100" : "[#546278]"
                  } border-[1px] border-gray-500 border-t-0 rounded-b-md text-${
                    mode === "light" ? "black" : "white"
                  } h-[11rem] overflow-y-scroll`}
                >
                  {voices.map((voice, indx) => {
                    return (
                      <div key={voice.name}>
                        <button
                          className="py-[0.5rem] px-[1rem] text-[1rem] cursor-pointer"
                          onClick={changeVoice}
                          name={indx}
                        >
                          {voice.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </button>

              <button
                className={`outline-none bg-transparent font-semibold text-[1rem] inline-block cursor-pointer text-${
                  mode === "light" ? "black" : "white"
                }`}
                title="Case"
              >
                <div
                  className="py-[0.5rem] px-[1rem] border-r-[1px] border-gray-500"
                  title="Change Case"
                >
                  Speed
                  <input
                    className="ml-[0.5rem]"
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={readSpeed}
                    onChange={changeSpeed}
                  />
                </div>
              </button>
            </div>

            <div className="flex py-[0.5rem]">
              <button
                className="cursor-pointer w-[2rem]"
                title="Mic Input"
                onClick={handleMicrophone}
              >
                <i
                  className={`fa-solid fa-microphone${
                    !listening ? "" : "-slash"
                  } text-[0.9rem] md:text-[1.2rem] text-${
                    mode === "light" ? "black" : "white"
                  }`}
                ></i>
              </button>

              <div>
                <button
                  className={`cursor-pointer w-[2rem]`}
                  title="Read Text"
                  onClick={readText}
                >
                  <i
                    className={`fa-solid fa-play text-[0.9rem] md:text-[1.2rem] text-${
                      mode === "light" ? "black" : "white"
                    }`}
                  ></i>
                </button>
                <button
                  className={`cursor-pointer w-[2rem] `}
                  title="Pause Reading"
                  onClick={pauseReading}
                >
                  <i
                    className={`fa-solid fa-pause text-[0.9rem] md:text-[1.2rem] text-${
                      mode === "light" ? "black" : "white"
                    }`}
                  ></i>
                </button>
              </div>

              <button
                className={`cursor-pointer w-[2rem]`}
                title="Stop Reading"
                onClick={stopReading}
              >
                <i
                  className={`fa-solid fa-stop text-[0.9rem] md:text-[1.2rem] text-${
                    mode === "light" ? "black" : "white"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------- */}

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
        } days-one-regular`}
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
