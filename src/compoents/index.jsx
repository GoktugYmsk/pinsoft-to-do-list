import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';
import Form from 'react-bootstrap/Form';
import { setActive } from './configure';
import Toast from 'react-bootstrap/Toast';


import Content from '../compoents/content';
import Footer from '../compoents/footer';
import Popup from '../compoents/popup';

function Components() {

    const [popup, setPopup] = useState(false)
    const [selectedTasks, setSelectedTasks] = useState([]);
    const navigate = useNavigate();

    const active = useSelector((state) => state.darkActive.active);
    const popupModel = useSelector((state) => state.modal.popupModal);

    const dispatch = useDispatch();

    const switchClick = () => {
        dispatch(setActive(!active));
    };

    const handleClosePage = () => {
        setPopup(true)
    }

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Pinsoft To-Do-List</title>
            </Helmet>
            <div className="toast-container">
                <Toast className='toast-container__box' onClose={() => setPopup(false)} show={popup} delay={3000} autohide>
                    <Toast.Header className='toast-container__header' >
                        <strong>Are you sure</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-secondary mx-1" onClick={() => setPopup(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary mx-1" onClick={handleLogout}>
                                Continue
                            </button>
                        </div>
                    </Toast.Body>
                </Toast>
            </div>
            <div className={`components__icon ${popupModel ? 'components__icon__opacity' : ''}`}>
                <Form.Check type="switch" id="custom-switch" className="custom-switch " onClick={switchClick} />
                <FiLogOut className={`logout__switch ${!active ? 'logout__switch__acitive' : ''}`} onClick={handleClosePage} />
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
    );
}

export default Components;
