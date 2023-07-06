import React, { useState } from "react";
import {  useSelector } from 'react-redux';
import Login from "./compoents/content/login";
import Components from "./compoents";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  const active = useSelector((state) => state.darkActive.active);
  return (
    <div className={`App  ${active ? 'app-active ' : 'App'}`}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainpage" element={<Components />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
