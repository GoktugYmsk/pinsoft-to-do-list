import React, { useState } from 'react';

import LeftContent from './leftContent';
import MiddleContent from './midddleContent';
import RightContent from './rightContent';

import './index.scss';

function Content() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);


  return (
    <div className='container-content'>
      <LeftContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
      <MiddleContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} />
      <RightContent doneTasks={doneTasks} setDoneTasks={setDoneTasks} />
    </div>
  );
}

export default Content;
