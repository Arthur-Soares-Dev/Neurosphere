const admin = require('../config/firebase');

const getTasks = async (req, res) => {
    try {
        const tasksRef = admin.firestore().collection('tasks');
        const snapshot = await tasksRef.get();
        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        res.status(500).json({ error: 'Erro ao obter tarefas' });
    }
};

const addTask = async (req, res) => {
    const { name, description, date, startTime, endTime, completed, favorite, tags } = req.body;

    try {
        const taskRef = admin.firestore().collection('tasks').doc();
        await taskRef.set({
            name,
            description,
            date,
            startTime,
            endTime,
            completed: completed || false,
            favorite: favorite || false,
            tags: Array.isArray(tags) ? tags : [],
        });
        res.status(201).json({ id: taskRef.id });
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskRef = admin.firestore().collection('tasks').doc(req.params.taskId);
        await taskRef.update(req.body);
        res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskRef = admin.firestore().collection('tasks').doc(req.params.taskId);
        await taskRef.delete();
        res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};
