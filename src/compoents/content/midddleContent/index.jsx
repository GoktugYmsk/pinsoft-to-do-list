import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { setDoingTask } from '../../configure';

import './index.scss';
import { useTodoLister } from '../../../firebase';

function MiddleContent({ selectedTasks, setSelectedTasks, doneTasks, setDoneTasks }) {

  const dispatch = useDispatch();

  const taskList = useTodoLister();

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
    const task = taskList.find(task => task.id === selectedTasks[index]);
    if (task) {
      setEditedTask(task.task);
    }
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
        {selectedTasks.map((selectedTask, index) => {
          const task = taskList.find(task => task.id === selectedTask);
          if (task) {
            return (
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
                        <div>
                          <span style={{ textDecoration: doneTasks.includes(task) ? 'line-through' : 'none' }}>
                            {task.task}
                          </span>
                        </div>
                        <div className='iconcontainer'>
                          <FaTrashAlt
                            className='middleContent__box-icon__left'
                            onClick={() => handleDeleteTask(index)}
                          />
                          <FaEdit
                            className='middleContent__box__edit-icon'
                            onClick={() => handleEditClick(index)}
                          />
                          <BsCheckCircleFill
                            className='container__altBox-doneClick'
                            onClick={() => handleTaskDoneClick(index)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </ul>
              </div>
            );
          } else {
            // Eğer `task` bulunamazsa geçerli bir görevi ekrana yazdırmak yerine boş bir `<div>` döndürebiliriz
            return <div key={index}>Invalid task</div>;
          }
        })}
      </div>
    </div>
  );


}

export default MiddleContent;