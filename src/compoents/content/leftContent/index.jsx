import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getDocs } from 'firebase/firestore';
import { setAddTasks } from '../../configure';
import './index.scss';

function LeftContent({ selectedTasks, setSelectedTasks }) {
  const addTask = useSelector((state) => state.addTodo.addTask);
  const active = useSelector((state) => state.darkActive.active);
  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const handleDeleteClick = (taskID) => {
    const updatedAddTask = addTask.filter((task) => task.id !== taskID);
    dispatch(setAddTasks(updatedAddTask));
  };

  const handleTaskClick = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'todos', taskId);
      await updateDoc(taskDocRef, {
        status: 1
      });
      const updatedAddTask = addTask.map((task) =>
        task.id === taskId ? { ...task, status: 1 } : task
      );
      dispatch(setAddTasks(updatedAddTask));
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedTask(addTask[index]?.text || '');
  };

  const handleSaveEdit = async () => {
    if (editedTask.trim() !== '') {
      try {
        const todoDocRef = doc(db, 'todos', addTask[editingIndex].id);
        await updateDoc(todoDocRef, {
          text: editedTask
        });
        const updatedAddTask = addTask.map((task, index) =>
          index === editingIndex ? { ...task, text: editedTask } : task
        );
        dispatch(setAddTasks(updatedAddTask));
        setEditingIndex(-1);
      } catch (error) {
        console.error('Error updating todo: ', error);
      }
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todoCollection = collection(db, 'todos');
        const snapshot = await getDocs(todoCollection);
        const todoList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setAddTasks(todoList));
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchData();
  }, []);

  const filteredTasks = addTask.filter((task) => task.status === 0);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className={`leftconent  ${active ? 'leftconent-active ' : 'leftconent'}`}>
          <div className="headercontent">
            <h2>TODO</h2>
          </div>
          <div className="leftcontent__list">
            <div className="todoCheck">
              <ul>
                {filteredTasks.map((task, index) => (
                  <div className="todoCheck__box" key={index}>
                    {editingIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editedTask}
                          onChange={(e) => setEditedTask(e.target.value)}
                          onBlur={handleSaveEdit}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <span>{task.text}</span>
                        </div>
                        <div>
                          <FaTrashAlt
                            className="todoCheck__box-icon__left"
                            onClick={() => handleDeleteClick(task.id)}
                          />
                          <FaEdit
                            className="todoCheck__box__edit-icon"
                            onClick={() => handleEditClick(index)}
                          />
                          <BsCheckCircleFill
                            className="todoCheck__box-icon__rigth"
                            onClick={() => handleTaskClick(task.id)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftContent;
