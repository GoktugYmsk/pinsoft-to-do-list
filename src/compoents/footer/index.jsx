import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddTasks } from '../configure';

import {app,database} from "../../firebase";
import { collection, addDoc } from 'firebase/firestore';

import './index.scss';

function Footer() {
    const [data , setData] = useState({});
    const collectionRef = collection(database, "todo");

    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const addTask = useSelector((state) => state.addTodo.addTask);

    const handleChange = (event) => {
        setInput(event.target.value);
        let newInput = {[event.target.name]: event.target.value};
        setData({ ...data, ...newInput});
    };

    const handleSubmit = () => {
        if (input.trim() !== '') {
            const updatedTasks = [...addTask, input];
            dispatch(setAddTasks(updatedTasks));
            setInput('');

            addDoc(collectionRef, {
                task: data.task
            })
              .then(() => {
                alert("Data Added!");
              })
              .catch((err) => {
                alert(err.message);
              })
        }
    };

    return (
        <div className='footer-container'>
            <input name='task' onChange={handleChange} placeholder='New Item' value={input} />
            <button onClick={handleSubmit}>Add Task</button>
        </div>
    );
}

export default Footer;
