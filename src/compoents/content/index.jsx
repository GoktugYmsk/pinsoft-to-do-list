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
      <div className="row">
        <div className="col mb-3">
        <LeftContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
        </div>

        <div className="col mb-3">
        <MiddleContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} />
        </div>
        <div className="col mb-3">
        <RightContent doneTasks={doneTasks} selectedTasks={selectedTasks} setDoneTasks={setDoneTasks}  setSelectedTasks={setSelectedTasks}/>
        </div>
      </div>
    </div>
  );
}

export default Content;
