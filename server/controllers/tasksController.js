const { getTasksByUserId, createTask, updateTaskById, deleteTaskById } = require('../models/taskModel');

// Função utilitária para verificar se userId está presente
function validateUserId(userId) {
    console.log('userId2',userId)
    if (!userId) {
        throw new Error('userId é obrigatório');
    }
}

// Controller para obter todas as tarefas de um usuário
async function getTasks(req, res) {
    const { userId } = req.query; // Obtendo userId da query string
    try {
        validateUserId(userId); // Verificação do userId
        const tasks = await getTasksByUserId(userId);
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        res.status(400).json({ error: error.message });
    }
}

const addTask = async (req, res) => {
    const { userId } = req.body; // Obtendo userId da query string
    console.log('userId',userId)
    const taskData = req.body;

    console.log('Dados da tarefa recebidos:', taskData); // Log dos dados recebidos
    if (!taskData || typeof taskData !== 'object') {
        return res.status(400).json({ error: 'Dados da tarefa inválidos.' });
    }

    try {
        const result = await createTask(userId, taskData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: error.message });
    }
};



// Controller para atualizar uma tarefa existente
async function updateTask(req, res) {
    const { taskId } = req.params;
    const taskData = req.body;
    try {
        validateUserId(taskData.userId); // Verificação do userId
        const updatedTask = await updateTaskById(taskData.userId, taskId, taskData);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(400).json({ error: error.message });
    }
}

// Controller para deletar uma tarefa
async function deleteTask(req, res) {
    const { taskId } = req.params;
    const { userId } = req.query; // Obtendo userId do corpo da requisição
    console.log('userId',userId)
    try {
        validateUserId(userId); // Verificação do userId
        const message = await deleteTaskById(userId, taskId);
        res.status(200).json(message);
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};
