import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Content from "./compoents/content";
import Footer from "./compoents/footer";
import Popup from "./compoents/popup";

import { useTodoLister } from "./firebase";

import "./App.css";

function App() {
  console.log();

  const [selectedTasks, setSelectedTasks] = useState([]);

  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft To-Do-List</title>
      </Helmet>
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
