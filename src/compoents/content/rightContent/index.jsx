import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { IoReturnDownBack } from 'react-icons/io5';

import './index.scss';

function RightContent({ doneTasks, setDoneTasks, selectedTasks, setSelectedTasks }) {
  const active = useSelector((state) => state.darkActive.active);
  const handleDeleteDone = (index) => {
    const updatedDoneTasks = doneTasks.filter((_, taskIndex) => taskIndex !== index);
    setDoneTasks(updatedDoneTasks);
  };

  const handleTurnClick = (index) => {
    const task = doneTasks[index];

    if (!selectedTasks.includes(task)) {
      setSelectedTasks([...selectedTasks, task]);
    } else {
      const updatedSelectedTasks = selectedTasks.filter((selectedTask) => selectedTask !== task);
      setSelectedTasks(updatedSelectedTasks);
    }
  };

  return (
    <div className={`rightconent  ${active ? 'right-conent-active' : 'rightconent'}`}>
      <div className="headercontent">
        <h2>DONE</h2>
      </div>
      <div className='rightcontent__list'>
        {selectedTasks.map((task, index) => {
          const matchedTask = selectedTasks.find((item) => item.id === task);
          if (matchedTask) {
            return (
              <div key={index} className='rightcontent__list-box'>
                <div className='rightcontent__list-check'>
                  <div>
                    <span>{matchedTask.task}</span>
                  </div>
                  <div>
                    <FaTrashAlt
                      className='rigthContnent__box-icon__left'
                      onClick={() => handleDeleteDone(index)}
                    />
                    <IoReturnDownBack
                      className='rigthContnent__box-icon__rigth'
                      onClick={() => handleTurnClick(index)}
                    />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default RightContent;
