// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Web app's firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKZauoVxK0mS311h40VXgIWJ5JxSpMyTQ",
  authDomain: "neurosphere-132f0.firebaseapp.com",
  projectId: "neurosphere-132f0",
  storageBucket: "neurosphere-132f0.appspot.com",
  messagingSenderId: "970304876059",
  appId: "1:970304876059:web:5d130b3b36cf4301f592be",
  measurementId: "G-RHFBV6FTME"
};

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase}