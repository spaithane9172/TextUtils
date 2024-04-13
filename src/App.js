// import About from "./component/About";
// import Contact from "./component/Contact";
import Navbar from "./component/Navbar";
import Textutil from "./component/Textutil";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const changeMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  return (
    <>
      <Navbar mode={mode} changeMode={changeMode} />
      <Textutil mode={mode} />

      {/* <About />
      <Contact /> */}
    </>
  );
}

export default App;
