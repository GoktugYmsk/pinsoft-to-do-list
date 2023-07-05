import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

import { setAddTasks } from '../../configure';

import { deleteTodo, useTodoLister } from "../../../firebase";

import './index.scss';

function LeftContent({ selectedTasks, setSelectedTasks }) {
    const addTask = useSelector((state) => state.addTodo.addTask);

    const dispatch = useDispatch();

    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedTask, setEditedTask] = useState('');

    const taskList = useTodoLister();

    const handleDeleteClick = (taskID) => {
        const updatedAddTask = addTask.filter((task) => task.id !== taskID);
        dispatch(setAddTasks(updatedAddTask));
        deleteTodo(taskID);
    };

    const handleTaskClick = (index) => {
        const updatedAddTask = addTask.filter((_, idx) => idx !== index);
        dispatch(setAddTasks(updatedAddTask));
        const optionTask = addTask[index];
        if (!selectedTasks.includes(optionTask)) {
            setSelectedTasks([...selectedTasks, optionTask]);
        }
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditedTask(addTask[index]);
    };

    const handleSaveEdit = () => {
        if (editedTask.trim() !== '') {
            const updatedAddTask = addTask.map((task, index) =>
                index === editingIndex ? editedTask : task
            );
            dispatch(setAddTasks(updatedAddTask));
            setEditingIndex(-1);
        }
    };

    console.log(" --------- ", taskList);

    return (
        <div className="row">
            <div className="col-md-12">
            <div className='leftconent'>
               <div className="headercontent">
                  <h2>TODO</h2>
                </div>
            
            <div className='leftcontent__list'>
                <div className='todoCheck'>
                    <ul>
                        {taskList.map((task, index) => (
                            <div className="todoCheck__box" key={index}>
                                
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
                                            <span>{task.task}</span>
                                        </div>
                                        <div>
                                            <FaTrashAlt
                                                className='todoCheck__box-icon__left'
                                                onClick={() => handleDeleteClick(task.id)}
                                            />
                                            <FaEdit
                                                className='todoCheck__box__edit-icon'
                                                onClick={() => handleEditClick(index)}
                                            />
                                            <BsCheckCircleFill
                                                className='todoCheck__box-icon__rigth'
                                                onClick={() => handleTaskClick(index)}
                                            />
                                        </div>
                                    </>
                                )}
                                </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
            </div>
        </div>
    );
}

export default LeftContent;
