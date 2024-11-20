const { auth, firestore } = require('../config/firebase');

// Função para criar um novo usuário no Firebase Authentication e no Firestore
async function createUserWithAuth(email, password, name) {
    try {
        // Cria o usuário no Firebase Authentication
        const userRecord = await auth.createUser({ email, password });
        const uid = userRecord.uid;

        // Cria o usuário no Firestore com o uid gerado
        const userData = { 
            name,    // Nome do usuário
            email    // Email do usuário
        };
        
        await firestore.collection('users').doc(uid).set(userData);

        return { uid, ...userData };
    } catch (error) {
        throw new Error('Erro ao criar o usuário: ' + error.message);
    }
}

// Função para fazer login e obter os dados do usuário
async function loginUserByEmail(email, password) {
    try {
        // Obtém o usuário pelo email
        const user = await auth.getUserByEmail(email);
        // Verificar a senha aqui seria normalmente feito via Firebase Auth no frontend

        // Obtém os dados do usuário no Firestore
        const userData = await getUser(user.uid);
        return userData;
    } catch (error) {
        throw new Error('Erro ao fazer login: ' + error.message);
    }
}

// Função para obter os dados do usuário no Firestore
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

// Função para atualizar um usuário no Firestore
async function updateUser(uid, updates) {
    try {
        await firestore.collection('users').doc(uid).update(updates);
        const updatedUserDoc = await firestore.collection('users').doc(uid).get();
        return { uid, ...updatedUserDoc.data() };
    } catch (error) {
        throw new Error('Erro ao atualizar o usuário: ' + error.message);
    }
}

// Função para logout (gerida no frontend normalmente)
function logoutUser() {
    return { message: "Logout bem-sucedido." };
}

module.exports = {
    createUserWithAuth,
    loginUserByEmail,
    getUser,
    updateUser,
    logoutUser,
};
