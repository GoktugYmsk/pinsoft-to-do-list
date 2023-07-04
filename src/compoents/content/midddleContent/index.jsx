import React from 'react';

import { Space, Switch } from 'antd';
import { FaTrashAlt } from 'react-icons/fa';

import './index.scss';

function MiddleContent({ selectedTasks, setSelectedTasks, doneTasks, setDoneTasks }) {

  const handleDeleteTask = (index) => {
    const updatedSelectedTasks = selectedTasks.filter((_, taskIndex) => taskIndex !== index);
    setSelectedTasks(updatedSelectedTasks);
  };

  const handleTaskDoneChange = (index, checked) => {
    const task = selectedTasks[index];

    if (checked && !doneTasks.includes(task)) {
      setDoneTasks([...doneTasks, task]);
    } else if (!checked && doneTasks.includes(task)) {
      const updatedDoneTasks = doneTasks.filter((doneTask) => doneTask !== task);
      setDoneTasks(updatedDoneTasks);
    }
  };

  return (
    <div className='middleconent'>
      <div className="headercontent">
            <h2>DOING</h2>
       </div>
      <div className='middlecontent__list'>
        {selectedTasks.map((task, index) => (
          task && (
            <div className='middlecontent__list__todoCheck' key={index}>
              <ul>
                <div className="middleContent__box ">
                  <div>
                    <span style={{ textDecoration: doneTasks.includes(task) ? 'line-through' : 'none' }}>{task}</span>
                  </div>
                  <div className='iconcontainer'>
                  <FaTrashAlt className='middleContent__box-icon__left' onClick={() => handleDeleteTask(index)} />
                  <Space direction='vertical'>
                    <Switch 
                      className='container__altBox-switch'
                     
                      checked={doneTasks.includes(task)}
                      onChange={(checked) => handleTaskDoneChange(index, checked)}
                    />
                    <div className="switch-label">
                       {doneTasks.includes(task) ? "Done" : "Incomplete"}
                     </div>
                  </Space>
                  </div>
                </div>
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default MiddleContent;
