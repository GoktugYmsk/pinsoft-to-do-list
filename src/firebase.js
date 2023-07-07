
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSoU9WuRU7wPoLvAyvWxV4N3Q_NuFQtT4",
    authDomain: "fir-tutorial-todo.firebaseapp.com",
    projectId: "fir-tutorial-todo",
    storageBucket: "fir-tutorial-todo.appspot.com",
    messagingSenderId: "80899110532",
    appId: "1:80899110532:web:b974f7ecec90a9e1e1f4d1"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { app, db };

