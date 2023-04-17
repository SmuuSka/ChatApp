import Login from './pages/Login';
import './cssFiles/Main.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
function App() {
  return (
      <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/pages/Register" element={<Register />}/>
          <Route path="/pages/Home" element={<Home/>}/>
      </Routes>

  );
}

export default App;
