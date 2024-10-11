import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
import { Task } from '../models/Task';
import api from '../service/api'; // Importa a API
import { useAuth } from './AuthContext'; // Importa o contexto de autenticação

const TasksContext = createContext();

export function TasksProvider({ children }) {
    const { user } = useAuth(); // Acesse o contexto de autenticação
    const userId = user ? user.uid : null; // Obtenha o userId do usuário autenticado
    console.log('userId',userId)
    const [tasks, setTasks] = useState([]);
    console.log('tasks',tasks)
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) return; // Retorna se não houver userId

            try {
                const response = await api.get(`/tasks?userId=${userId}`); // Inclui userId na requisição
                const tasksList = response.data.map((taskData) => new Task(
                    taskData.id,
                    taskData.name,
                    taskData.description,
                    taskData.date,
                    taskData.startTime,
                    taskData.endTime,
                    taskData.completed,
                    taskData.favorite,
                    taskData.tags,
                    taskData.mensagem,
                    taskData.emoji
                ));
                setTasks(tasksList);
                console.log('tasksList',tasksList)
            } catch (error) {
                console.error("Erro ao carregar tarefas:", error);
                setError("Erro ao carregar tarefas.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [userId]); // Dependência de userId

    const updateTaskMessageAndEmoji = async (taskId, mensagem, emoji) => {
        try {
            await api.put(`/tasks/${taskId}`, { mensagem, emoji, userId }); // Inclui userId na requisição
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, mensagem, emoji } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar mensagem e emoji:', error);
            setError("Erro ao atualizar a tarefa.");
        }
    };

    const toggleCompleted = async (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    const completed = true;
                    api.put(`/tasks/${taskId}?completed=${completed}`, { completed, userId }); // Inclui userId na requisição
                    return { ...task, completed: completed };
                }
                return task;
            })
        );
    };

    const favoriteTask = async (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    const favoriteStatus = !task.favorite;
                    api.put(`/tasks/${taskId}`, { favorite: favoriteStatus, userId }); // Inclui userId na requisição
                    return { ...task, favorite: favoriteStatus };
                }
                return task;
            })
        );
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}?userId=${userId}`); // Inclui userId na requisição
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            setError("Erro ao deletar a tarefa.");
        }
    };

    const addTask = async (newTaskData) => {
        try {
            const response = await api.post('/tasks', { ...newTaskData, userId }); // Inclui userId na requisição
            const newTask = new Task(
                response.data.id,
                newTaskData.name || '',
                newTaskData.description || '',
                newTaskData.date || '',
                newTaskData.startTime || '',
                newTaskData.endTime || '',
                newTaskData.completed !== undefined ? newTaskData.completed : false,
                newTaskData.favorite !== undefined ? newTaskData.favorite : false,
                Array.isArray(newTaskData.tags) ? newTaskData.tags : []
            );
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            setError("Erro ao adicionar a tarefa.");
        }
    };

    const updateTask = async (taskId, updatedData) => {
        try {
            await api.put(`/tasks/${taskId}`, { ...updatedData, userId }); // Inclui userId na requisição
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedData } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            setError("Erro ao atualizar a tarefa.");
        }
    };

    const speakTask = (speakName, speakDescription) => {
        const thingToSay = `Nome da tarefa: ${speakName}. Descrição da tarefa: ${speakDescription}.`;
        const options = {
            rate: 0.8,
            language: 'pt-BR'
        };
        Speech.speak(thingToSay, options);
    };

    const getColorForTask = (task) => {
        if (task.completed) {
            return '#B0BEC5';
        }
        const colors = ['#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFECB3'];
        const index = tasks.indexOf(task) % colors.length;
        return colors[index];
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                selectedTaskId,
                setSelectedTaskId,
                toggleCompleted,
                favoriteTask,
                deleteTask,
                addTask,
                updateTask,
                speakTask,
                getColorForTask,
                updateTaskMessageAndEmoji,
                isLoading,
                error
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => useContext(TasksContext);
