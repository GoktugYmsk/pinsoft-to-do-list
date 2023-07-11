import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';
import Form from 'react-bootstrap/Form';
import { setActive, setIsLoggedIn } from './configure';
import Toast from 'react-bootstrap/Toast';
import { setLogoutPopup } from './configure';


import Content from '../components/content';
import Footer from '../components/footer';
import Popup from '../components/popup';

function Components() {
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [isChecked, setIsChecked] = useState(true)

    const navigate = useNavigate();

    const active = useSelector((state) => state.darkActive.active);
    const popupModel = useSelector((state) => state.modal.popupModal);
    const logoutPopup = useSelector((state) => state.logout.logoutPopup);

    const dispatch = useDispatch();

    console.log('ischecked', isChecked)

    const switchClick = () => {
        dispatch(setActive(!active));
    };

    useEffect(() => {
        setIsChecked(active);
    }, [active]);

    const handleClosePage = () => {
        dispatch(setLogoutPopup(true))
    }

    const closePopup = () =>{
        dispatch(setLogoutPopup(false))
    }
 

    const handleLogout = async () => {
        dispatch(setIsLoggedIn(false))
        dispatch(setLogoutPopup(false))
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
                <Toast className='toast-container__box' show={logoutPopup}>
                    <Toast.Header className='toast-container__header' >
                        <strong>Are you sure</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-secondary mx-1" onClick={closePopup}>
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
                <Form.Check type="switch" id="custom-switch" className="custom-switch mb-2" checked={isChecked} onChange={switchClick} />
                <FiLogOut className={`logout__switch ${!active ? 'logout__switch__active' : ''}`} onClick={handleClosePage} />
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
