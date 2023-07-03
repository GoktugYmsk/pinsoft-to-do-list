import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAddTasks } from '../configure'

import './index.scss'

function Footer() {
    const [input, setInput] = useState('')
    const [tasks, setTasks] = useState([]) 

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = () => {
        if (input.trim() !== '') { 
            setTasks([...tasks, input]) 
            dispatch(setAddTasks([...tasks, input])) 
            setInput('') 
        }
    }

    return (
        <div className='footer-container'>
            <input onChange={handleChange} placeholder='New Item' value={input} />
            <button onClick={handleSubmit}>Add Task</button>
        </div>
    )
}

export default Footer
