import React, {createContext, useContext, useEffect, useState} from 'react';
import {Task} from '../models/Task';
import api from '../service/api';
import {useAuth} from './AuthContext';
import Utils from '../utils/Utils';
import { useLoading } from './LoadingContext';

const TasksContext = createContext();

export function TasksProvider({ children }) {
    const { user } = useAuth();
    const userId = user ? user.uid : null;
    console.log('userId',userId)
    const [tasks, setTasks] = useState([]);
    console.log('tasks',tasks)
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { startLoading, stopLoading } = useLoading();


    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) return;
            startLoading();

            try {
                const response = await api.get(`/tasks?userId=${userId}`);
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
                stopLoading();
            }
        };

        fetchTasks();
    }, [userId]);

    const updateTaskMessageAndEmoji = async (taskId, mensagem, emoji, completed = true) => {
        startLoading();
        try {
            await api.put(`/tasks/${taskId}`, { mensagem, emoji, userId, completed });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, mensagem, emoji, completed } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar mensagem e emoji:', error);
            setError("Erro ao atualizar a tarefa.");
        } finally {
            stopLoading();
        }
    };

    const toggleCompleted = async (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                startLoading();
                try {
                    if (task.id === taskId) {
                        const completed = true;
                        api.put(`/tasks/${taskId}?completed=${completed}`, {completed, userId});
                        return {...task, completed: completed};
                    }
                    return task;
                } catch (e) {
                    console.log('Erro ao completar tarefa', e)
                } finally {
                    stopLoading();
                }
            })
        );
    };

    const favoriteTask = async (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                startLoading();
                try {
                    if (task.id === taskId) {
                        const favoriteStatus = !task.favorite;
                        api.put(`/tasks/${taskId}`, { favorite: favoriteStatus, userId });
                        return { ...task, favorite: favoriteStatus };
                    }
                    return task;
                } catch (e) {
                    console.log('Erro ao favoritar tarefa', e)
                } finally {
                    stopLoading();
                }

            })
        );
    };

    const deleteTask = async (taskId) => {
        startLoading();
        try {
            await api.delete(`/tasks/${taskId}?userId=${userId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            setError("Erro ao deletar a tarefa.");
        } finally {
            stopLoading();
        }
    };

    const addTask = async (newTaskData) => {
        startLoading();
        try {
            const response = await api.post('/tasks', { ...newTaskData, userId });
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
        } finally {
            stopLoading();
        }
    };

    const updateTask = async (taskId, updatedData) => {
        startLoading();
        try {
            await api.put(`/tasks/${taskId}`, { ...updatedData, userId });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedData } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            setError("Erro ao atualizar a tarefa.");
        } finally {
            stopLoading();
        }
    };

    const speakTask = (speakName, speakDescription) => {
        const thingToSay = `Nome da tarefa: ${speakName || 'Sem nome'}. Descrição da tarefa: ${speakDescription || 'Sem descrição'}.`;
        Utils.speak(thingToSay)
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
