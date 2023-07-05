import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { setDoingTask } from '../../configure';

import './index.scss';

function MiddleContent({ selectedTasks, setSelectedTasks, doneTasks, setDoneTasks }) {
  const doingTask = useSelector((state) => state.doing.doingTask);

  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const handleDeleteTask = (index) => {
    const updatedSelectedTasks = selectedTasks.filter((_, taskIndex) => taskIndex !== index);
    setSelectedTasks(updatedSelectedTasks);
    dispatch(setDoingTask(updatedSelectedTasks));
  };

  const handleTaskDoneClick = (index) => {
    const task = selectedTasks[index];
    
    const updatedSelectedTasks = selectedTasks.filter((_, taskIndex) => taskIndex !== index);
    setSelectedTasks(updatedSelectedTasks);
    dispatch(setDoingTask(updatedSelectedTasks));

    if (!doneTasks.includes(task)) {
      setDoneTasks([...doneTasks, task]);
    } else if (doneTasks.includes(task)) {
      const updatedDoneTasks = doneTasks.filter((doneTask) => doneTask !== task);
      setDoneTasks(updatedDoneTasks);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedTask(selectedTasks[index]);
  };

  const handleSaveEdit = () => {
    if (editedTask.trim() !== '') {
      const updatedSelectedTasks = selectedTasks.map((task, index) =>
        index === editingIndex ? editedTask : task
      );
      setSelectedTasks(updatedSelectedTasks);
      dispatch(setDoingTask(updatedSelectedTasks));
      setEditingIndex(-1);
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
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <FaEdit
                        className='middleContent__box__edit-icon'
                        onClick={() => handleEditClick(index)}
                      />
                      <div>
                        <span style={{ textDecoration: doneTasks.includes(task) ? 'line-through' : 'none' }}>{task}</span>
                      </div>
                      <div className='iconcontainer'>
                        <FaTrashAlt
                          className='middleContent__box-icon__left'
                          onClick={() => handleDeleteTask(index)}
                        />
                        <BsCheckCircleFill
                          className='container__altBox-switch'
                          onClick={() => handleTaskDoneClick(index)}
                        />
                      </div>
                    </>
                  )}
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