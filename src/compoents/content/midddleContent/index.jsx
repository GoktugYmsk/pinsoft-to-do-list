import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import './index.scss';
import { useSelector } from 'react-redux';

function MiddleContent({ selectedTasks, setDoneTasks }) {
    const addTask = useSelector((state) => state.addTodo.addTask);

    const handleTaskClick = (index) => {
        const optionTask = addTask[index];
        setDoneTasks((prevDoneTasks) => [...prevDoneTasks, optionTask]);
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
                                    <FaTrashAlt className='middleContent__box-icon__left' />
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



// const handleTaskClick = (index) => {
//     if (selectedTasks.includes(index)) {
//         setSelectedTasks(selectedTasks.filter((item) => item !== index));
//     } else {
//         setSelectedTasks([...selectedTasks, index]);
//     }
// };


// const handleDeleteClick = (index) => {
//     const updatedAddTask = addTask.filter((item, idx) => idx !== index);
//     dispatch(setAddTasks(updatedAddTask));
// };