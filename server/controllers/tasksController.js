const { getAllTasks, createTask, updateTaskById, deleteTaskById } = require('../models/taskModel');

// Controller para obter todas as tarefas
async function getTasks(req, res) {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        res.status(500).json({ error: error.message });
    }
}

// Controller para adicionar uma nova tarefa
async function addTask(req, res) {
    const taskData = req.body;
    try {
        const newTask = await createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: error.message });
    }
}

// Controller para atualizar uma tarefa existente
async function updateTask(req, res) {
    const { taskId } = req.params;
    const taskData = req.body;
    try {
        const updatedTask = await updateTaskById(taskId, taskData);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: error.message });
    }
}

// Controller para deletar uma tarefa
async function deleteTask(req, res) {
    const { taskId } = req.params;
    try {
        const message = await deleteTaskById(taskId);
        res.status(200).json(message);
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};
