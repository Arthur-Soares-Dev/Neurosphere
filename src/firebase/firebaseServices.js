// /src/firebase/firebaseServices.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Configuração do Firebase
const firebaseConfig = {
apiKey: "AIzaSyAKZauoVxK0mS311h40VXgIWJ5JxSpMyTQ",
  authDomain: "neurosphere-132f0.firebaseapp.com",
  projectId: "neurosphere-132f0",
  storageBucket: "neurosphere-132f0.appspot.com",
  messagingSenderId: "970304876059",
  appId: "1:970304876059:web:5d130b3b36cf4301f592be",
  measurementId: "G-RHFBV6FTME"
};

// Inicialização do Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exportar instâncias
const firebaseAuth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { firebaseAuth, firestore, storage };
