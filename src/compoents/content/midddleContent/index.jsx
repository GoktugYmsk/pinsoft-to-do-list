import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { IoReturnDownBack } from 'react-icons/io5';
import { db } from '../../../firebase';
import { setAddTasks } from '../../configure';

import './index.scss';

function MiddleContent({ selectedTasks, setSelectedTasks }) {
  const active = useSelector((state) => state.darkActive.active);
  const addTask = useSelector((state) => state.addTodo.addTask);
  const dispatch = useDispatch();

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const handleDeleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'todos', taskId);
      await deleteDoc(taskDocRef);

      const updatedAddTask = addTask.filter((task) => task.id !== taskId);
      dispatch(setAddTasks(updatedAddTask));
      setSelectedTasks(selectedTasks.filter((task) => task !== taskId));
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const handleTaskDoneClick = async (taskId) => {
    const taskDocRef = doc(db, 'todos', taskId);

    try {
      await updateDoc(taskDocRef, {
        status: 2
      });

      const updatedAddTask = addTask.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 2
          };
        }
        return task;
      });

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

  const handleTurnClick = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'todos', taskId);

      await updateDoc(taskDocRef, {
        status: 0
      });

      const updatedAddTask = addTask.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 0
          };
        }
        return task;
      });

      dispatch(setAddTasks(updatedAddTask));
    } catch (error) {
      console.error('Error updating task status: ', error);
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

  const filteredTasks = addTask.filter((task) => task.status === 1);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const targetClassList = e.target.classList;

    const sourceContainer = e.dataTransfer.getData('sourceContainer');

    if (sourceContainer === 'todoCheck') {
      return; // Do nothing if dragging from the todoCheck container
    }

    if (targetClassList.contains('middlecontent__list') || targetClassList.contains('middleContent__box')) {
      handleTurnClick(taskId);
    }
  };


  return (
    <div className={`middleconent ${active ? 'middle-conent-active' : 'middleconent'}`}>
      <div className="headercontent">
        <h2>DOING</h2>
      </div>
      <div
        className="middlecontent__list"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="middlecontent__list__todoCheck">
          <ul>
            {filteredTasks.map((task, index) => (
              <div
                className="middleContent__box"
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
                      <span style={{ textDecoration: selectedTasks.includes(task.id) ? 'line-through' : 'none' }}>
                        {task.text}
                      </span>
                    </div>
                    <div className="iconcontainer">
                      <IoReturnDownBack
                        className='leftContnent__box-icon__rigth'
                        onClick={() => handleTurnClick(task.id)}
                      />
                      <FaTrashAlt
                        className="middleContent__box-icon__left"
                        onClick={() => handleDeleteTask(task.id)}
                      />
                      <FaEdit
                        className="middleContent__box__edit-icon"
                        onClick={() => handleEditClick(index, task.text)}
                      />
                      <BsCheckCircleFill
                        className="container__altBox-doneClick"
                        onClick={() => handleTaskDoneClick(task.id)}
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
  );
}

export default MiddleContent;
