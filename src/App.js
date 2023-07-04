import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { setPopupModal, setAddTasks,setDoingTask } from './compoents/configure';
import Content from './compoents/content';
import Footer from './compoents/footer';

import './App.css'

function App() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [input, setInput] = useState('');

  const popupModel = useSelector((state) => state.modal.popupModal);
  const addTask = useSelector((state) => state.addTodo.addTask);
  const doingTask = useSelector((state) => state.doing.doingTask);

  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(setPopupModal(false));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleHideModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleToDoClick = () => {
    if (input.trim() !== '') {
      const updatedTasks = [...addTask, input];
      dispatch(setAddTasks(updatedTasks));
      setInput('');
    }
  }

  const handleDoingClick = () => {
    if (input.trim() !== '') {
      const updatedDoingTasks = [...doingTask, input];
      dispatch(setDoingTask(updatedDoingTasks))
      setSelectedTasks(updatedDoingTasks)
      setInput('');
    }
  }

  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft To-Do-List</title>
      </Helmet>
      <h1>To Do List</h1>
      <Content selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
      <Footer />
      {popupModel && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="modal-close" onClick={handleHideModal}>
              &times;
            </span>
            <input onChange={handleChange} value={input} placeholder='New Item' />
            <div className='modal-content__options' >
              <button onClick={handleToDoClick} >ToDo </button>
              <button onClick={handleDoingClick}> Doing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
