const express = require('express');
const { registerUser, login, updateUserProfile, logout, getUserProfile } = require('../controllers/authController');

const router = express.Router();

// Rotas de autenticação
router.get('/', (req, res) => {
    res.send('Autenticação API está funcionando!');
});
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update/:uid', updateUserProfile);
router.get('/user/:uid', getUserProfile);

module.exports = router;
