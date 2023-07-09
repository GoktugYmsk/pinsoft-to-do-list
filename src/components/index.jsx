import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import Content from ".//content";
import Footer from ".//footer";
import Popup from ".//popup";
import { Helmet } from "react-helmet";
import { setActive } from './configure';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import { FiLogOut } from 'react-icons/fi';
import Form from 'react-bootstrap/Form';


function Components() {

    const active = useSelector((state) => state.darkActive.active);
    const popupModel = useSelector((state) => state.modal.popupModal);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const switchClick = () => {
        dispatch(setActive(!active))
    }


    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const [selectedTasks, setSelectedTasks] = useState([]);
    return (
        <>
            <Helmet>
                <title>Pinsoft To-Do-List</title>
            </Helmet>
            <div className={`components__icon ${popupModel ? 'components__icon__opacity' : ''}`} >
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    className="custom-switch "
                    onClick={switchClick}
                />
                <FiLogOut className={`logout__switch ${!active ? 'logout__switch__acitive' : ''}`} onClick={handleLogout} />
            </div>
            <div className="row header-container mb-3">
                <h1 id="header">To Do List</h1>
            </div>
            <Content
                selectedTasks={selectedTasks}
                setSelectedTasks={setSelectedTasks}
            />
            <Footer />
            <div className="popup-container">
                <Popup setSelectedTasks={setSelectedTasks} />
            </div>
        </>
    )
}

export default Components
