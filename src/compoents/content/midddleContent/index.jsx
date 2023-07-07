import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { doc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { setAddTasks } from '../../configure';
import { db } from '../../../firebase';

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

  return (
    <div className={`middleconent ${active ? 'middle-conent-active' : 'middleconent'}`}>
      <div className="headercontent">
        <h2>DOING</h2>
      </div>
      <div className="middlecontent__list">
        <div className="middlecontent__list__todoCheck">
          <ul>
            {filteredTasks.map((task, index) => (
              <div className="middleContent__box" key={index}>
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


/*

const handleEditClick = async (id) => {
  // Firestore'da belgeyi al
  const todoDocRef = doc(db, 'todos', id);
  const todoDocSnapshot = await getDoc(todoDocRef);
  
  // Belge verisini al
  if (todoDocSnapshot.exists()) {
    const todoData = todoDocSnapshot.data();
    setEditedTask(todoData.text); // Düzenlenen metni ayarla
    setEditingIndex(id); // Düzenleme indeksini ayarla
  }
};

const handleSaveEdit = async () => {
  try {
    const todoDocRef = doc(db, 'todos', editingIndex);
    await updateDoc(todoDocRef, {
      text: editedTask
    });
    
    // Güncellenen veriyi yerel todo listesinde de güncelle
    setTodos(todos.map(todo => (todo.id === editingIndex ? { ...todo, text: editedTask } : todo)));
    
    // Düzenleme durumunu sıfırla
    setEditingIndex(-1);
    setEditedTask('');
  } catch (error) {
    console.error('Error updating todo: ', error);
  }
};

*/