import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddTasks } from '../configure';
import LeftContent from './leftContent';
import MiddleContent from './midddleContent';
import RightContent from './rightContent';


import './index.scss';

function Content() {
  const addTask = useSelector((state) => state.addTodo.addTask);
  const [selectedTasks, setSelectedTasks] = useState([]);


  return (
    <div className='container-content'>
      <LeftContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
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
