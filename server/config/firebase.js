// /backend/config/firebase.js
const admin = require('firebase-admin');

// Chave do Firebase Admin SDK
const serviceAccount = require('./serviceAccount');

// Inicialize o Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "https://neurosphere-132f0.firebaseapp.com",
});
const firestore = admin.firestore();
const auth = admin.auth();
const storage = admin.storage().bucket();

module.exports = { firestore, auth, storage, admin };
