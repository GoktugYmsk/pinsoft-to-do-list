import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LeftContent from './leftContent';
import MiddleContent from './midddleContent';
import RightContent from './rightContent';

import './index.scss';

function Content({ selectedTasks, setSelectedTasks }) {

  const [doneTasks, setDoneTasks] = useState([]);
<<<<<<< HEAD
=======
  
  const active = useSelector((state) => state.darkActive.active);
  
>>>>>>> 48b14c82ddc54c3d0fb8a668c63cda0cbb8e65a1

  const active = useSelector((state) => state.darkActive.active);


  return (
    <div className={`container-content  ${active ? 'container-content-active' : 'container-content'}`}>
      <div className="row justify-content-center">
        <div className="col-xl-4 col-lg-6 col-md-12 mb-5 mr-1">
          <LeftContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12 mb-5 mr-1">
          <MiddleContent selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12 mb-3 mr-1">
          <RightContent doneTasks={doneTasks} selectedTasks={selectedTasks} setDoneTasks={setDoneTasks} setSelectedTasks={setSelectedTasks} />
        </div>
      </div>
    </div>
  );
}

export default Content;
