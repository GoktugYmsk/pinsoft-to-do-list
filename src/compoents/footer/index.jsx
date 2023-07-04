import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddTasks } from '../configure';

import './index.scss';

function Footer() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const addTask = useSelector((state) => state.addTodo.addTask);

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = () => {
        if (input.trim() !== '') {
            const updatedTasks = [...addTask, input];
            dispatch(setAddTasks(updatedTasks));
            setInput('');
        }
    };

    return (
        <div className='footer-container'>
            <input onChange={handleChange} placeholder='New Item' value={input} />
            <button onClick={handleSubmit}>Add Task</button>
        </div>
    );
}

export default Footer;
