import React from "react";

export default function About(props) {
  return (
    <div
      className={`pt-[3rem] md:pt-[7rem] px-[10vw] py-[5vh] bg-${
        props.mode === "light" ? "white" : "[#222831]"
      } text-${props.mode === "light" ? "black" : "white"} text-center`}
    >
      <h1 className="font-bold text-3xl mb-[1.2rem] days-one-regular">
        About TextUtils
      </h1>
      <p className="text-justify mb-[2rem]">
        Welcome to our dynamic React app, your ultimate text manipulation
        companion! Whether you prefer traditional typing or the convenience of
        speech input, we've tailored our app to suit your needs. Harness the
        power of text transformation with ease - effortlessly convert text to
        uppercase or lowercase, ensuring consistency and clarity in your
        communications. Say goodbye to cluttered text with our space-removal
        feature, keeping your content neat and tidy. Need to replicate or
        transfer text? Our intuitive copy and paste functionality makes it a
        breeze. Experience the synergy of efficiency and convenience with our
        feature-packed app, designed to elevate your text-editing experience to
        new heights.
      </p>
      <h1 className="font-bold text-2xl mb-[1.2rem] text-center days-one-regular">
        Features Of Textutils
      </h1>
      <div className=" flex flex-wrap w-[80vw] justify-center items-center mb-[5vh]">
        <div
          className={`bg-gray-200 w-[17rem] h-[16rem] bg-opacity-30 border-[1px] border-${
            props.mode === "light" ? "black" : "white"
          } rounded-xl flex-col justify-center items-center shadow-md shadow-${
            props.mode === "light" ? "black" : "white"
          } p-[1rem] my-[2vh] sm:mx-2`}
        >
          <h1 className="mb-[1rem] font-bold">
            Case Converter: Transform Text Instantly
          </h1>
          <p className="text-justify">
            Effortlessly switch between uppercase and lowercase text to
            streamline your writing process and ensure consistency with our Case
            Converter tool.
          </p>
        </div>

        <div
          className={`bg-gray-200 w-[17rem] h-[16rem] bg-opacity-30 border-[1px] border-${
            props.mode === "light" ? "black" : "white"
          } rounded-xl flex-col justify-center items-center shadow-md shadow-${
            props.mode === "light" ? "black" : "white"
          } p-[1rem] my-[2vh] sm:mx-2`}
        >
          <h1 className="mb-[1rem] font-bold">
            Space Remover: Clean Up Text Instantly
          </h1>
          <p className="text-justify">
            Easily eliminate excess spaces from your text, enhancing readability
            and improving formatting with our Space Remover tool.
          </p>
        </div>

        <div
          className={`bg-gray-200 w-[17rem] h-[16rem] bg-opacity-30 border-[1px] border-${
            props.mode === "light" ? "black" : "white"
          } rounded-xl flex-col justify-center items-center shadow-md shadow-${
            props.mode === "light" ? "black" : "white"
          } p-[1rem] my-[2vh] sm:mx-2`}
        >
          <h1 className="mb-[1rem] font-bold">
            Text-to-Speech: Hear Your Words
          </h1>
          <p className="text-justify">
            Transform text into spoken words effortlessly, perfect for
            multitasking or accessibility needs with our Text-to-Speech feature.
          </p>
        </div>

        <div
          className={`bg-gray-200 w-[17rem] h-[16rem] bg-opacity-30 border-[1px] border-${
            props.mode === "light" ? "black" : "white"
          } rounded-xl flex-col justify-center items-center shadow-md shadow-${
            props.mode === "light" ? "black" : "white"
          } p-[1rem] my-[2vh] sm:mx-2`}
        >
          <h1 className="mb-[1rem] font-bold">
            Speech Input: Hands-Free Text Entry
          </h1>
          <p className="text-justify">
            Dictate text effortlessly using your microphone, enabling convenient
            input and accessibility with our Speech Input feature.
          </p>
        </div>
      </div>
    </div>
  );
}
