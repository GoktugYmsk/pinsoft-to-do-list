import React, { useState } from "react";


import Login from "./compoents/content/login";
import Components from "./compoents";



import { BrowserRouter, createBrowserRouter, Route, Router, routerProvider, Routes } from "react-router-dom";

import "./App.css";


function App() {

  return (
<<<<<<< HEAD
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/mainpage" element={<Components/>} />
        </Routes>
      </BrowserRouter>
=======
    <div className="App app-active">
      <Helmet>
        <title>Pinsoft To-Do-List</title>
      </Helmet>
      <Form.Check 
        type="switch"
        id="custom-switch"
        onClick={switchClick}
      />
      <div className="row header-container mb-3">
        <h1 id="header">To Do List</h1>
      </div>
      <Content
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
      />
      <Footer />
      <div className="popup-container">
        <Popup setSelectedTasks={setSelectedTasks} />
      </div>
>>>>>>> 741e20f74b304e30415d549eb2d7a46d50b81540

    </div>
  );
}

export default App;
