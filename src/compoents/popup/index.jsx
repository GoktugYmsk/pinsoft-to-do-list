import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupModal, setAddTasks, setDoingTask } from '../configure';
import { app, db } from '../../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import './index.scss';

function Popup({ setSelectedTasks }) {
    const [data, setData] = useState({});
    const [input, setInput] = useState('');

    const active = useSelector((state) => state.darkActive.active);
    const popupModal = useSelector((state) => state.modal.popupModal);
    const addTask = useSelector((state) => state.addTodo.addTask);
    const doingTask = useSelector((state) => state.doing.doingTask);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setInput(event.target.value);
        let newInput = { [event.target.name]: event.target.value };
        setData({ ...data, ...newInput });
    };
    
    const handleToDoClick = async () => {
        if (input.trim() !== '') {
            const updatedTasks = [...addTask, { task: input, status: 0 }];
            dispatch(setAddTasks(updatedTasks));
            setInput('');

            try {
                const collectionRef = collection(db, 'todo list');
                const docRef = await addDoc(collectionRef, { task: input, status: 0 });
                console.log('Veri Firebase\'e gönderildi. Doküman ID:', docRef.id);

                // Firestore'da güncelleme yapmak için kullanılabilir
                const docId = docRef.id;
                const todoDocRef = doc(db, 'todo list', docId);
                await updateDoc(todoDocRef, { status: 0 });

                // Örneğin, todo listesindeki verinin durumunu güncellemek için yukarıdaki gibi updateDoc kullanabilirsiniz
                // İlgili alanları kendi gereksinimlerinize göre ayarlayın

            } catch (error) {
                console.error('Veri gönderme hatası:', error);
            }
        }
    };


    const handleDoingClick = async () => {
        if (input.trim() !== '') {
            const updatedDoingTasks = [...doingTask, input];
            dispatch(setDoingTask(updatedDoingTasks));
            setSelectedTasks(updatedDoingTasks);
            setInput('');

            try {
                const collectionRef = collection(db, 'doing list');
                const docRef = await addDoc(collectionRef, { task: input });
                console.log('Veri Firebase\'e gönderildi. Doküman ID:', docRef.id);
            } catch (error) {
                console.error('Veri gönderme hatası:', error);
            }
        }
    };

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
            {popupModal && (
                <div className={`modal-container  ${active ? 'modal-container-active' : 'modal-container'}`}>
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleHideModal}>
                            &times;
                        </span>
                        <input name="task" onChange={handleChange} value={input} placeholder="New Item" />
                        <div className="modal-content__options">
                            <button onClick={handleToDoClick}>ToDo</button>
                            <button onClick={handleDoingClick}>Doing</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup;
