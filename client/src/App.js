import Login from './pages/Login';
import './cssFiles/Main.css';
import React from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./cssFiles/Chat.css";
/**
 Komponentti, joka sisältää sovelluksen reitityksen.
 @returns {JSX.Element}
 */
function App() {
  const navigate = useNavigate();
  return (
      <Routes>
          <Route exact path="/" element={<Login navigate={navigate}/>}/>
          <Route path="/pages/Register" element={<Register navigate={navigate}/>}/>
          <Route path="/pages/Home" element={<Home navigate={navigate}/>}/>
      </Routes>

  );
}

export default App;
