import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBu2wpztORPvJddauKQYMLih83v1GZN5gE",
  authDomain: "pinsoft-to-do-list.firebaseapp.com",
  projectId: "pinsoft-to-do-list",
  storageBucket: "pinsoft-to-do-list.appspot.com",
  messagingSenderId: "621607766162",
  appId: "1:621607766162:web:11cfc66678f3c14a9ebe4b",
  measurementId: "G-LNE9MQHRH9"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);


const todoRef = collection(database, "todo list");

export const useTodoLister = () => {

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    return onSnapshot(todoRef, snapshot => {
      setTodo(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
    });
  }, []);

  return todo;
};

export const deleteTodo = (id) => {
  deleteDoc(doc(database, "todo list", id))
}