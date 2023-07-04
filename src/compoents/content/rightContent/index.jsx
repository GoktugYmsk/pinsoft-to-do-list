import React from 'react'

import { FaTrashAlt } from 'react-icons/fa';
import { IoReturnDownBack } from 'react-icons/io5';

import './index.scss'

function RightContent({ doneTasks, setDoneTasks,selectedTasks }) {

  const handleDeleteDone = (index) => {

    const updateSelectedTasks = doneTasks.filter((_, taskIndex) => taskIndex !== index)
    setDoneTasks(updateSelectedTasks)



  }

  const handleTurnClick = (index) => {

    const task = selectedTasks[index];

    if (!doneTasks.includes(task)) {
      setDoneTasks([...doneTasks, task]);
    } else {
      const updatedDoneTasks = doneTasks.filter((doneTask) => doneTask !== task);
      setDoneTasks(updatedDoneTasks);
    }

  }

  return (
    <div className='rightconent'>
      <div className="headercontent">
        <h2>DONE</h2>
      </div>
      <div className='rightcontent__list'>
        {doneTasks.map((tasks, index) => (
          tasks && (
            <div key={index} className='rightcontent__list-box'>
              <div className='rightcontent__list-check' >
                <div>
                  <span>{tasks}</span>
                </div>
                <div>
                  <FaTrashAlt
                    className='rigthContnent__box-icon__left'
                    onClick={() => handleDeleteDone(index)}
                  />
                  <IoReturnDownBack onClick={() => handleTurnClick(index)}
                    className='rigthContnent__box-icon__rigth'
                  />
                </div>

              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default RightContent