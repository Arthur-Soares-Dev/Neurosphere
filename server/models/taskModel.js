const { firestore } = require('../config/firebase'); // Importando Firestore corretamente

// Função para obter todas as tarefas de um usuário do Firestore
async function getTasksByUserId(userId) {
    try {
        console.log('USERID', userId);
        const tasksRef = firestore.collection('users').doc(userId).collection('Tasks'); // Alterando para a estrutura correta
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
async function createTask(userId, taskData) {
    // Verifica se o userId está definido e não é uma string vazia
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('userId inválido.');
    }

    const { name, description, date, startTime, endTime, completed, favorite, tags } = taskData;

    try {
        // Usando a estrutura correta para o caminho do Firestore
        const taskRef = firestore.collection('users').doc(userId).collection('Tasks').doc();
        await taskRef.set({
            name,
            description,
            date,
            startTime,
            endTime,
            completed: completed || false,
            favorite: favorite || false,
            tags: Array.isArray(tags) ? tags : [],
            userId: userId,
        });
        return { id: taskRef.id }; // Retorna o ID da nova tarefa criada
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error); // Log do erro
        throw new Error('Erro ao adicionar tarefa: ' + error.message);
    }
}

// Função para atualizar uma tarefa existente no Firestore
async function updateTaskById(userId, taskId, taskData) {
    try {
        const taskRef = firestore.collection('users').doc(userId).collection('Tasks').doc(taskId); // Usando a estrutura correta
        const doc = await taskRef.get();

        // Verifica se a tarefa pertence ao usuário
        if (!doc.exists) {
            throw new Error('Tarefa não encontrada');
        }

        console.log('taskData',taskData)
        await taskRef.update(taskData);
        return { message: 'Tarefa atualizada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa: ' + error.message);
    }
}

// Função para deletar uma tarefa do Firestore
async function deleteTaskById(userId, taskId) {
    try {
        const taskRef = firestore.collection('users').doc(userId).collection('Tasks').doc(taskId); // Usando a estrutura correta
        const doc = await taskRef.get();

        // Verifica se a tarefa pertence ao usuário
        if (!doc.exists) {
            throw new Error('Tarefa não encontrada');
        }

        await taskRef.delete();
        return { message: 'Tarefa deletada com sucesso' };
    } catch (error) {
        throw new Error('Erro ao deletar tarefa: ' + error.message);
    }
}

module.exports = {
    getTasksByUserId,
    createTask,
    updateTaskById,
    deleteTaskById,
};
