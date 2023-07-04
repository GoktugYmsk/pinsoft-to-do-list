import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddTasks } from '../configure';
import { setPopupModal } from '../configure';

import './index.scss';

function Footer() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const addTask = useSelector((state) => state.addTodo.addTask);
    const popupModel = useSelector((state) => state.modal.popupModal);


    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = () => {
        dispatch(setPopupModal(true))
       
    };


    return (
        <div className={`footer-container ${popupModel ? 'footer-container__opacity' : ''}`}>
            <button onClick={handleSubmit}>Add Task</button>
        </div>
    );
}

export default Footer;
