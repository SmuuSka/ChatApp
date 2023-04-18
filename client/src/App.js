import Login from './pages/Login';
import './cssFiles/Main.css';
import React from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  return (
      <Routes>
          <Route exact path="/" element={<Login navigate={navigate}/>}/>
          <Route path="/pages/Register" element={<Register navigate={navigate}/>}/>
          <Route path="/pages/Home" element={<Home />}/>
      </Routes>

  );
}

export default App;
