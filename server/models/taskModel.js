const admin = require('../config/firebase');

// Função para obter todas as tarefas do Firestore
async function getAllTasks() {
    try {
        const tasksRef = admin.firestore().collection('tasks');
        const snapshot = await tasksRef.get();
        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return tasks;
    } catch (error) {
        throw new Error('Erro ao obter tarefas: ' + error.message);
    }
}

// Função para adicionar uma nova tarefa ao Firestore
async function createTask(taskData) {
    const { name, description, date, startTime, endTime, completed, favorite, tags } = taskData;

    try {
        const taskRef = admin.firestore().collection('tasks').doc();
        await taskRef.set({
            name,              // Nome da tarefa
            description,       // Descrição da tarefa
            date,              // Data da tarefa
            startTime,         // Hora de início da tarefa
            endTime,           // Hora de término da tarefa
            completed: completed || false, // Status de completude
            favorite: favorite || false,   // Status de favorito
            tags: Array.isArray(tags) ? tags : [], // Tags associadas
        });
        return { id: taskRef.id };
    } catch (error) {
        throw new Error('Erro ao adicionar tarefa: ' + error.message);
    }
}

// Função para atualizar uma tarefa existente no Firestore
async function updateTaskById(taskId, taskData) {
    try {
        const taskRef = admin.firestore().collection('tasks').doc(taskId);
        await taskRef.update(taskData);
        return { message: 'Tarefa atualizada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa: ' + error.message);
    }
}

// Função para deletar uma tarefa do Firestore
async function deleteTaskById(taskId) {
    try {
        const taskRef = admin.firestore().collection('tasks').doc(taskId);
        await taskRef.delete();
        return { message: 'Tarefa deletada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar tarefa: ' + error.message);
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTaskById,
    deleteTaskById,
};
