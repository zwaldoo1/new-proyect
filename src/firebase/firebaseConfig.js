// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDk-VSMtcq_UOLGr0VqwDvche1XogF4ODY",
  authDomain: "campeonato-rifa.firebaseapp.com",
  projectId: "campeonato-rifa",
  storageBucket: "campeonato-rifa.appspot.com",
  messagingSenderId: "450710578621",
  appId: "1:450710578621:web:e11027e45ff08ad9aa1ed4",
  measurementId: "G-HL2VWYLCQV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
