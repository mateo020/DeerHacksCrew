import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./Pages/Home/Login"
import Navbar from "./Pages/Home/Navbar";
import Home from "./Pages/Home/Homescreen";
import TerraTalk from "./Pages/Home/TerraTalk";
import Registration from './Pages/Home/Homescreen/Registration';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Registration />}></Route>
            <Route path="/home" element={<><Navbar /><Home /></>}></Route>
            <Route path="/terratalk" element={<><Navbar /><TerraTalk /></>}></Route> {/* TerraTalk route */}
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
