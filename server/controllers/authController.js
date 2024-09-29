const { auth } = require('../config/firebase');
const { createUser, getUser, updateUser } = require('../models/userModel');

// Registrar novo usuário
async function registerUser(req, res) {
    const { email, password, name } = req.body;
    try {
        const userRecord = await auth.createUser({ email, password });
        await createUser(userRecord.uid, { name, email });
        res.status(201).json({ uid: userRecord.uid, name, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fazer login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await auth.getUserByEmail(email);
        // Implementar lógica para verificar a senha (normalmente via Firebase Authentication no frontend)
        const userData = await getUser(user.uid);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Atualizar usuário
async function updateUserProfile(req, res) {
    const { uid } = req.params;
    const updates = req.body;
    try {
        const updatedUser = await updateUser(uid, updates);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Logout é gerido no frontend, ao invalidar o token
function logout(req, res) {
    res.status(200).json({ message: "Logout bem-sucedido." });
}

module.exports = {
    registerUser,
    login,
    updateUserProfile,
    logout,
};
