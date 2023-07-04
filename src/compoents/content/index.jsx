import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeftContent from './leftContent';
import MiddleContent from './midddleContent';
import RightContent from './rightContent';
import './index.scss';

function Content() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const addTask = useSelector((state) => state.addTodo.addTask);

  return (
    <div className='container-content'>
      <LeftContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
      <MiddleContent selectedTasks={selectedTasks} setDoneTasks={setDoneTasks} />
      <div className='rightconent'>
        <h2>DONE</h2>
        <div className='rightcontent__list'>
          <p className='todoCheck'>
            {selectedTasks.map((index) => (
              addTask[index]
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content;
