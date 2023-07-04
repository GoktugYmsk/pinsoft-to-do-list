import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

import { setAddTasks } from '../../configure';

import './index.scss';

function LeftContent({ selectedTasks, setSelectedTasks }) {
    const addTask = useSelector((state) => state.addTodo.addTask);

    const dispatch = useDispatch();

    const handleDeleteClick = (index) => {
        const updatedAddTask = addTask.filter((_, idx) => idx !== index);
        dispatch(setAddTasks(updatedAddTask));
    };

    const handleTaskClick = (index) => {
        const updatedAddTask = addTask.filter((_, idx) => idx !== index);
        dispatch(setAddTasks(updatedAddTask));
        const optionTask = addTask[index];
        if (!selectedTasks.includes(optionTask)) {
            setSelectedTasks([...selectedTasks, optionTask]);
        }
    };

    return (
        <div className='leftconent'>
            <div className="headercontent">
            <h2>TODO</h2>
            </div>
            <div className='leftcontent__list'>
                <div className='todoCheck'>
                    <ul>
                        {addTask.map((task, index) => (
                            <div className="todoCheck__box" key={index}>
                                <div>
                                    <span>{task}</span>
                                </div>
                                <div>
                                <FaTrashAlt
                                    className='todoCheck__box-icon__left'
                                    onClick={() => handleDeleteClick(index)}
                                />      
                                <BsCheckCircleFill
                                    className='todoCheck__box-icon__rigth'
                                    onClick={() => handleTaskClick(index)}
                                />
                                </div>   
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LeftContent;
