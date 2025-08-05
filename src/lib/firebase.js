import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrn2-siV9XZxms0caGwz6kA1bCM4i5kgM",
  authDomain: "campeonato-v1.firebaseapp.com",
  projectId: "campeonato-v1",
  storageBucket: "campeonato-v1.firebasestorage.app",
  messagingSenderId: "1043512279797",
  appId: "1:1043512279797:web:5a9a78f014f5f3aeb0bbbc",
  measurementId: "G-WCQ3P76HEL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
