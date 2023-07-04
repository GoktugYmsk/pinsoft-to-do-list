import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddTasks } from '../configure';
import { setPopupModal } from '../configure';

import { app, database } from "../../firebase";
import { collection, addDoc } from 'firebase/firestore';

import './index.scss';

function Footer() {
    const [data, setData] = useState({});
    const collectionRef = collection(database, "todo");

    const dispatch = useDispatch();
    const popupModel = useSelector((state) => state.modal.popupModal);

    const handleSubmit = () => {
        dispatch(setPopupModal(true))
    };


    return (
        <div className={`footer-container ${popupModel ? 'footer-container__opacity' : ''}`}>
            <div className='footer-container'>
                <button onClick={handleSubmit}>Add Task</button>
            </div>
        </div>
    );
}

export default Footer;
