const { createUserWithAuth, loginUserByEmail, getUser, updateUser, logoutUser } = require('../models/userModel');

// Registrar novo usuário
async function registerUser(req, res) {
    const { email, password, name } = req.body;
    try {
        const user = await createUserWithAuth(email, password, name);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fazer login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const userData = await loginUserByEmail(email, password);
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

// Logout
function logout(req, res) {
    const message = logoutUser();
    res.status(200).json(message);
}

// Buscar perfil de usuário por uid
async function getUserProfile(req, res) {
    const { uid } = req.params;
    try {
        const user = await getUser(uid);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUser,
    login,
    updateUserProfile,
    logout,
    getUserProfile
};
