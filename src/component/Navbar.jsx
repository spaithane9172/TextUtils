import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuToggle = () => {
    setIsMenuVisible(isMenuVisible ? false : true);
  };
  const [isActive, setIsActive] = useState("/");

  return (
    <nav
      className={`fixed flex px-[5vw] sm:h-[10vh] h-[7vh] w-full bg-${
        props.mode === "light" ? "gray-400" : "black"
      } bg-clip-padding backdrop-filter backdrop-blur-sm ${
        props.mode === "light" ? "bg-opacity-10" : ""
      } border-b-[1px] sm:border-0 border-gray-100`}
    >
      <Link to="/" className="flex items-center">
        <div className="flex items-center mr-[5vw]">
          <img
            src={logo}
            alt=""
            className="relative sm:h-[6vh] h-[4vh] mr-[1rem]"
          />
          <h1
            className={`lobster-regular font-bold text-[2rem] text-${
              props.mode === "light" ? "black" : "white"
            }`}
          >
            TextUtils
          </h1>
        </div>
      </Link>

      <div
        className={`${
          isMenuVisible ? "" : "hidden"
        } lg:flex lg:static absolute lg:top-0 lg:left-0 sm:top-[10vh] top-[7vh] left-[40%] flex-col lg:flex-row justify-center w-[60vw] lg:w-full lg:justify-between bg-${
          props.mode === "light" ? "white" : "black"
        } lg:bg-transparent items-center border-[1px] border-black lg:border-0`}
      >
        <ul className="flex lg:flex-row flex-col  items-center">
          <Link
            to="/"
            onClick={() => {
              setIsActive("/");
            }}
          >
            <li
              className={`px-[1.5rem] py-[1.2rem] font-bold font-[Oswal] text-[1.3rem] cursor-pointer hover:scale-105 text-${
                props.mode === "light" ? "black" : "white"
              } yatra-one-regular ${
                isActive === "/"
                  ? `border-b-[2px] ${
                      props.mode === "dark" ? "border-white" : "border-black"
                    }`
                  : ""
              } `}
            >
              Home
            </li>
          </Link>
          <Link
            to="/about"
            onClick={() => {
              setIsActive("about");
            }}
          >
            <li
              className={`px-[1.5rem] py-[1.2rem] font-bold font-[Oswal] text-[1.3rem] cursor-pointer hover:scale-105 text-${
                props.mode === "light" ? "black" : "white"
              } yatra-one-regular ${
                isActive === "about"
                  ? `border-b-[2px] ${
                      props.mode === "dark" ? "border-white" : "border-black"
                    }`
                  : ""
              }`}
            >
              About TextUtils
            </li>
          </Link>
        </ul>
        <div className="flex pb-[1.2rem] justify-center items-center text-2xl rounded-[100%] lg:pb-0">
          <i
            className={`text-center fa-solid fa-${
              props.mode === "light" ? "moon" : "sun"
            } cursor-pointer text-${
              props.mode === "light" ? "black" : "white"
            }`}
            onClick={props.changeMode}
          ></i>
        </div>
      </div>
      <div className="lg:hidden flex w-full justify-end items-center">
        <i
          onClick={menuToggle}
          className={`fa-solid fa-bars text-2xl  border-[1px] border-${
            props.mode === "light" ? "black" : "white"
          } py-[0.2rem] px-[0.6rem] rounded-md shadow-sm shadow-black cursor-pointer text-${
            props.mode === "light" ? "black" : "white"
          }`}
        ></i>
      </div>
    </nav>
  );
}
