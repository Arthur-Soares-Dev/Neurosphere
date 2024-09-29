const { firestore } = require('../config/firebase');

// Função para criar um novo usuário no Firestore
async function createUser(uid, userData) {
    try {
        await firestore.collection('users').doc(uid).set(userData);
        return { uid, ...userData };
    } catch (error) {
        throw new Error('Erro ao criar o usuário no Firestore: ' + error.message);
    }
}

// Função para obter os dados do usuário
async function getUser(uid) {
    try {
        const userDoc = await firestore.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            throw new Error('Usuário não encontrado.');
        }
        return { uid, ...userDoc.data() };
    } catch (error) {
        throw new Error('Erro ao obter usuário: ' + error.message);
    }
}

// Função para atualizar um usuário
async function updateUser(uid, updates) {
    try {
        await firestore.collection('users').doc(uid).update(updates);
        const updatedUserDoc = await firestore.collection('users').doc(uid).get();
        return { uid, ...updatedUserDoc.data() };
    } catch (error) {
        throw new Error('Erro ao atualizar o usuário: ' + error.message);
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
};
