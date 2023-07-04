import React from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

import './index.scss';

function MiddleContent({ selectedTasks, setSelectedTasks, doneTasks, setDoneTasks }) {

    const handleTaskClick = (index) => {
        const clickedTask = selectedTasks[index];

        if (!doneTasks.includes(clickedTask)) {
            setDoneTasks([...doneTasks, clickedTask]);
        }
    };

    const handleDeleteTask = (index) => {
        const updatedSelectedTasks = selectedTasks.filter((_, taskIndex) => taskIndex !== index);
        setSelectedTasks(updatedSelectedTasks);
    };

    return (
        <div className='middleconent'>
            <h2>DOING</h2>
            <div className='middlecontent__list'>
                {selectedTasks.map((task, index) => (
                    task && (
                        <div className='middlecontent__list__todoCheck' key={index}>
                            <ul>
                                <div className="middleContent__box ">
                                    <FaTrashAlt className='middleContent__box-icon__left' onClick={() => handleDeleteTask(index)} />
                                    <li>{task}</li>
                                    <BsCheckCircleFill
                                        onClick={() => handleTaskClick(index)}
                                        className='middleContent__box-icon__right'
                                    />
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
