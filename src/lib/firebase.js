// firebase.js o donde inicialices Firebase
import { initializeApp } from '../lib/firebase';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDrn2-siV9XZxms0caGwz6kA1bCM4i5kgM",
  authDomain: "campeonato-v1.firebaseapp.com",
  projectId: "campeonato-v1",
  storageBucket: "campeonato-v1.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcd1234"
};

const app = initializeApp(firebaseConfig);

// Solo ejecuta analytics en el navegador
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      getAnalytics(app);
    }
  });
}

export default app;
