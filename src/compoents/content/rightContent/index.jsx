import React from 'react'

import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

import './index.scss'

function RightContent({ doneTasks, setDoneTasks }) {

  const handleDeleteDone = (index) => {

    const updateSelectedTasks = doneTasks.filter((_, taskIndex) => taskIndex !== index)
    setDoneTasks(updateSelectedTasks)

  }

  return (
    <div className='rightconent'>
      <h2>DONE</h2>
      <div className='rightcontent__list'>
        {doneTasks.map((tasks, index) => (
          tasks && (
            <div key={index} className='rightcontent__list-box'>
              <div className='rightcontent__list-check' >
                <FaTrashAlt
                  className='rigthContnent__box-icon__left'
                  onClick={() => handleDeleteDone(index)}
                />
                <li >{tasks}</li>
                <BsCheckCircleFill
                  className='rigthContnent__box-icon__rigth'
                />
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default RightContent