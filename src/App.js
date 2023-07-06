import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Content from "./compoents/content";
import Footer from "./compoents/footer";
import Popup from "./compoents/popup";
import Login from "./compoents/content/login";
import Form from 'react-bootstrap/Form';

import { setActive } from "./compoents/configure";


import { useTodoLister } from "./firebase";

import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function App() {
  
  const active = useSelector((state) => state.darkActive.active);
const dispatch = useDispatch()

const switchClick = () =>{
  dispatch(setActive(!active))
  }

  const [selectedTasks, setSelectedTasks] = useState([]);


  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft To-Do-List</title>
      </Helmet>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Check this switch"
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

    </div>
  );
}

export default App;
