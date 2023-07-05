import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LeftContent from './leftContent';
import MiddleContent from './midddleContent';
import RightContent from './rightContent';

import './index.scss';

function Content({selectedTasks,setSelectedTasks}) {
  const [doneTasks, setDoneTasks] = useState([]);

  const popupModel = useSelector((state) => state.modal.popupModal);

  return (
    <div className={`container-content ${popupModel ? 'container-content__opacity' : ''}`}>
      <LeftContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
      <MiddleContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} />
      <RightContent doneTasks={doneTasks} selectedTasks={selectedTasks} setDoneTasks={setDoneTasks}  setSelectedTasks={setSelectedTasks}/>
    </div>
  );
}

export default Content;
