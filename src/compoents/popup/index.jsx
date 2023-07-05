import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { setPopupModal, setAddTasks, setDoingTask } from '../configure';

import {app,database} from "../../firebase";

import { collection, addDoc } from 'firebase/firestore';

import './index.scss'

function Popup({setSelectedTasks}) {
    const [data , setData] = useState({});

    const [input, setInput] = useState('');

    const popupModel = useSelector((state) => state.modal.popupModal);
    const addTask = useSelector((state) => state.addTodo.addTask);
    const doingTask = useSelector((state) => state.doing.doingTask);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setInput(event.target.value);
        let newInput = {[event.target.name]: event.target.value};
        setData({ ...data, ...newInput});
    };

    const handleToDoClick = () => {
        if (input.trim() !== '') {
            const updatedTasks = [...addTask, input];
            dispatch(setAddTasks(updatedTasks));
            setInput('');
            console.log('Todo',updatedTasks)

            const collectionRef = collection(database, "todo list"); 
            addDoc(collectionRef, {
                task: data.task
            })
        }
    }

    const handleDoingClick = () => {
        if (input.trim() !== '') {
            const updatedDoingTasks = [...doingTask, input];
            dispatch(setDoingTask(updatedDoingTasks))
            setSelectedTasks(updatedDoingTasks)
            setInput('');

            const collectionRef = collection(database, "doing list"); 
            addDoc(collectionRef, {
                task: data.task
            })
        }
    }

    const handleHideModal = () => {
        dispatch(setPopupModal(false));
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleHideModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <>
            {popupModel && (
                <div className="modal-container">
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleHideModal}>
                            &times;
                        </span>
                        <input name='task' onChange={handleChange} value={input} placeholder='New Item' />
                        <div className='modal-content__options' >
                            <button onClick={handleToDoClick} >ToDo </button>
                            <button onClick={handleDoingClick}> Doing</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Popup