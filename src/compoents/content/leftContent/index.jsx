import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { doc, updateDoc, collection } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getDocs } from 'firebase/firestore';
import { setAddTasks } from '../../configure';
import './index.scss';

function LeftContent() {
  const addTask = useSelector((state) => state.addTodo.addTask);
  const active = useSelector((state) => state.darkActive.active);
  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const handleDeleteClick = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'todos', taskId);
      await deleteDoc(taskDocRef);

      const updatedAddTask = addTask.filter((task) => task.id !== taskId);
      dispatch(setAddTasks(updatedAddTask));
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const handleTaskClick = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'todos', taskId);
      await updateDoc(taskDocRef, {
        status: 1,
      });
      const updatedAddTask = addTask.map((task) =>
        task.id === taskId ? { ...task, status: 1 } : task
      );
      dispatch(setAddTasks(updatedAddTask));
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  const handleEditClick = (index, taskText) => {
    setEditingIndex(index);
    setEditedTask(taskText);
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'todos', taskId);
      await updateDoc(taskDocRef, {
        text: editedTask,
      });

      const updatedAddTask = addTask.map((task) =>
        task.id === taskId ? { ...task, text: editedTask } : task
      );
      dispatch(setAddTasks(updatedAddTask));

      setEditingIndex(-1);
      setEditedTask('');
    } catch (error) {
      console.error('Error updating task: ', error);
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
                          onBlur={() => handleSaveEdit(task.id)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(task.id);
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
                            onClick={() => handleEditClick(index, task.text)}
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
