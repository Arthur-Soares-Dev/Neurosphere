const express = require('express');
const router = express.Router();
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/tasksController');
const authenticateJWT = require('../middleware/authenticateJWT'); // Middleware para autenticação

router.get('/', authenticateJWT, getTasks); // Obter todas as tarefas (requer autenticação)
router.post('/', authenticateJWT, addTask); // Adicionar nova tarefa (requer autenticação)
router.put('/:taskId', authenticateJWT, updateTask); // Atualizar tarefa (requer autenticação)
router.delete('/:taskId', authenticateJWT, deleteTask); // Deletar tarefa (requer autenticação)

module.exports = router;