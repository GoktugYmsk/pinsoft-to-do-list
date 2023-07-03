import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { setAddTasks } from '../configure';

import './index.scss';

function Content() {
  const addTask = useSelector((state) => state.addTodo.addTask);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dispatch = useDispatch();

  const handleTaskClick = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter((item) => item !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  const handleDeleteClick = (index) => {
    const updatedAddTask = addTask.filter((item, idx) => idx !== index);
    dispatch(setAddTasks(updatedAddTask));
    setSelectedTasks(selectedTasks.filter((item) => item !== index));
  };

  return (
    <div className='container-content'>
      <div className='leftconent'>
        <h2>TODO</h2>
        <div className='leftcontent__list'>
          <div className='todoCheck'>
            <ul>
              {addTask.map((task, index) => (
                <div
                  className={`todoCheck__box ${selectedTasks.includes(index) ? 'selected' : ''
                    }`}
                  key={index}
                >
                  <FaTrashAlt
                    className='todoCheck__box-icon__left'
                    onClick={() => handleDeleteClick(index)}
                  />
                  <li>{task}</li>
                  <BsCheckCircleFill
                    className='todoCheck__box-icon__rigth'
                    onClick={() => handleTaskClick(index)}
                  />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='middleconent'>
        <h2>DOING</h2>
        <div className='middlecontent__list'>
          {selectedTasks.map((index) => (
            <p key={index} className='middlecontent__list__todoCheck'>
              {addTask[index]}
            </p>
          ))}
        </div>
      </div>
      <div className='rightconent'>
        <h2>DONE</h2>
        <div className='rightcontent__list'>
          <p className='todoCheck'>Check emails</p>
        </div>
      </div>
    </div>
  );
}

export default Content;
