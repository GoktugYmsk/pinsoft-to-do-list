import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { FaTrashAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { db } from '../../../firebase';
import { setAddTasks } from '../../configure';
import './index.scss';

function LeftContent() {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

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

  const handleDragStart = (event, task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = async (event) => {
    event.preventDefault();
    if (draggedTask && draggedTask.status !== 1) {
      try {
        const taskDocRef = doc(db, 'todos', draggedTask.id);

        await updateDoc(taskDocRef, {
          status: 1
        });

        const updatedAddTask = addTask.map((t) => {
          if (t.id === draggedTask.id) {
            return {
              ...t,
              status: 1
            };
          }
          return t;
        });

        dispatch(setAddTasks(updatedAddTask));
      } catch (error) {
        console.error('Error updating task status: ', error);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
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
          <div className="leftcontent__list" onDragOver={handleDragOver} onDrop={handleDragEnd}>
            <div className="todoCheck">
              <ul>
                {filteredTasks.map((task, index) => (
                  <div
                    className="todoCheck__box"
                    key={index}
                    draggable
                    onDragStart={(event) => handleDragStart(event, task)}
                    onDragEnd={handleDragEnd}
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
                            className="todoCheck_box-icon_left"
                            onClick={() => handleDeleteClick(task.id)}
                          />
                          <FaEdit
                            className="todoCheck_box_edit-icon"
                            onClick={() => handleEditClick(index, task.text)}
                          />
                          <BsCheckCircleFill
                            className="todoCheck_box-icon_rigth"
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