import { initializeApp } from '../lib/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

async function cargarNumeros() {
  for (let i = 1; i <= 1000; i++) {
    const docRef = doc(db, "rifa_numeros", i.toString());
    await setDoc(docRef, { 
      numero: i,           // 🔹 Guardado como número
      reservado: false     // 🔹 Siempre false
    });
    if (i % 500 === 0) console.log(`✅ Generados ${i}`);
  }
  console.log("🎉 ¡Listo! Todos los números han sido cargados.");
}

// Ejecutar
cargarNumeros();

cargarNumeros();
