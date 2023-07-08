import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoReturnDownBack } from 'react-icons/io5';
import { db } from '../../../firebase';
import { setAddTasks } from '../../configure';

import './index.scss';

function LeftContent() {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const addTask = useSelector((state) => state.addTodo.addTask);
  const active = useSelector((state) => state.darkActive.active);

  const dispatch = useDispatch();

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
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceContainer', 'middleContent');
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const targetClassList = e.target.classList;

    if (targetClassList.contains('leftcontent__list') || targetClassList.contains('todoCheck__box')) {
      handleTaskClick(taskId);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className={`leftconent  ${active ? 'leftconent-active ' : 'leftconent'}`}>
          <div className="headercontent">
            <h2>TODO</h2>
          </div>
          <div
            className="leftcontent__list"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="todoCheck">
              <ul>
                {filteredTasks.map((task, index) => (
                  <div
                    className="todoCheck__box"
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
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
