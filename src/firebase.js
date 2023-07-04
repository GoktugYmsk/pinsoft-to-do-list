import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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