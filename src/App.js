import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import Content from './compoents/content';
import Footer from './compoents/footer';
import Popup from './compoents/popup';

import { useTodoLister } from "./firebase"

import './App.css'

function App() {
  console.log();

  const [selectedTasks, setSelectedTasks] = useState([]);

  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft To-Do-List</title>
      </Helmet>
      <h1>To Do List</h1>
      <Content selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
      <Footer />
      <Popup  setSelectedTasks={setSelectedTasks} />
    </div>
  );
}

export default App;
