// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Suas credenciais do Firebase (ou use variáveis de ambiente para mais segurança)
const firebaseConfig = {
  apiKey: "AIzaSyAKZauoVxK0mS311h40VXgIWJ5JxSpMyTQ",
  authDomain: "neurosphere-132f0.firebaseapp.com",
  projectId: "neurosphere-132f0",
  storageBucket: "neurosphere-132f0.appspot.com",
  messagingSenderId: "970304876059",
  appId: "1:970304876059:web:5d130b3b36cf4301f592be",
  measurementId: "G-RHFBV6FTME"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB1LUDkBD_ADkjmicwXsL3irTr06D-aMYQ",
//   authDomain: "teste-neurosphere.firebaseapp.com",
//   projectId: "teste-neurosphere",
//   storageBucket: "teste-neurosphere.firebasestorage.app",
//   messagingSenderId: "530677849676",
//   appId: "1:530677849676:web:1dd7ab5547cd22664fdee9",
//   measurementId: "G-ZR0CELB89R"
// };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize os serviços Firebase que você precisa
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Exportar para usar em outras partes do app
export { app, auth, db, analytics };
