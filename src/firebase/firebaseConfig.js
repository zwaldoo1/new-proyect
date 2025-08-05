import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";

// 🔹 Configuración de tu Firestore
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

// 🔹 Escuchar cambios en tiempo real
const q = query(collection(db, "rifa_numeros"), orderBy("numero", "asc"));
onSnapshot(q, (snapshot) => {
  const numeros = snapshot.docs.map(doc => doc.data());
  console.log(numeros); // Aquí podrías actualizar tu HTML
});
