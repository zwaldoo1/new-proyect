import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = { /* Configuración de Firebase */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const registrarEquipo = async (equipo) => {
  await addDoc(collection(db, "equipos"), equipo);
};
