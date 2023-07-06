import React, { useState } from "react";


import Login from "./compoents/content/login";
import Components from "./compoents";



import { BrowserRouter, createBrowserRouter, Route, Router, routerProvider, Routes } from "react-router-dom";

import "./App.css";


function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/mainpage" element={<Components/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
