import About from "./component/About";
import Navbar from "./component/Navbar";
import Textutil from "./component/Textutil";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const changeMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  return (
    <BrowserRouter>
      <Navbar mode={mode} changeMode={changeMode} />
      <Routes>
        <Route exact path="/" element={<Textutil mode={mode} />} />
        <Route exact path="/about" element={<About mode={mode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
