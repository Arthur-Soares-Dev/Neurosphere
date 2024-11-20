import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Task} from '../models/Task';
import api from '../service/api';
import {useAuth} from './AuthContext';
import Utils from '../utils/Utils';
import { useLoading } from './LoadingContext';
import AlertsUtils from "../utils/AlertsUtils";

const TasksContext = createContext();

export function TasksProvider({ children }) {
    const { user } = useAuth();
    const userId = user ? user.uid : null;
    console.log('userId',userId)
    const [tasks, setTasks] = useState([]);
    console.log('tasks',tasks)
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { startLoading, stopLoading } = useLoading();

    const [error, setError] = useState({title: null, message: null});
    const [success, setSuccess] = useState({title: null, message: null});
    const firstRender = useRef(true);
    useEffect(() => {
        console.log('error',error)
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (error?.title || error?.message) {
            AlertsUtils.dangerToast(error.title, error.message);
            setError({title: null, message: null})
        }
    }, [error]);

    useEffect(() => {
        console.log('success',success)
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (success?.title || success?.message) {
            AlertsUtils.successToast(success.title, success.message);
            setSuccess({title: null, message: null})
        }
    }, [success]);


    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) return;
            startLoading();

            try {
                const response = await api.get(`/tasks?userId=${userId}`);
                const tasksList = response.data.tasks.map((taskData) => new Task(
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
                // setSuccess({
                //   title: response.data?.title ?? "Sucesso",
                //   message: response.data?.message ?? "",
                // })
                console.log('tasksList',tasksList)
            } catch (error) {
                setError({
                  title: error.title ?? "Erro",
                  message: error.message ?? "Tente novamente mais tarde.",
                })
                console.error("Erro ao carregar tarefas:", error);
            } finally {
                stopLoading();
            }
        };

        fetchTasks();
    }, [userId]);

    const updateTaskMessageAndEmoji = async (taskId, mensagem, emoji, completed = true) => {
        startLoading();
        try {
            const response = await api.put(`/tasks/${taskId}?completed=${completed}`, { mensagem, emoji, userId, completed });
            console.log('response.data',response.data)
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, mensagem, emoji, completed } : task
                )
            );
            setSuccess({
                title: response.data?.title ?? "Sucesso",
                message: response.data?.message ?? "",
            })
        } catch (error) {
            console.error('Erro ao atualizar mensagem e emoji:', error);
            setError({
              title: error.title ?? "Erro",
              message: error.message ?? "Tente novamente mais tarde.",
            })
            setError("Erro ao atualizar a tarefa.");
        } finally {
            stopLoading();
        }
    };

    const toggleCompleted = async (taskId) => {
        let response = null
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                startLoading();
                try {
                    if (task.id === taskId) {
                        const completed = true;
                        response = api.put(`/tasks/${taskId}?completed=${completed}`, {completed, userId});
                        return {...task, completed: completed};
                    }

                    return Utils.removeTitleAndMessage(task);
                } catch (e) {
                    setError({
                      title: error.title ?? "Erro",
                      message: error.message ?? "Tente novamente mais tarde.",
                    })
                    console.log('Erro ao completar tarefa', e)
                } finally {
                    stopLoading();
                }
            })
        );

        setSuccess({
            title: response?.data?.title ?? "Sucesso",
            message: response?.data?.message ?? "",
        })
    };

    const favoriteTask = async (taskId) => {
        let response = null;
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                startLoading();
                try {
                    if (task.id === taskId) {
                        const favoriteStatus = !task.favorite;
                        response = api.put(`/tasks/${taskId}`, { favorite: favoriteStatus, userId });
                        return { ...task, favorite: favoriteStatus };
                    }
                    return task;
                } catch (e) {
                    setError({
                      title: error.title ?? "Erro",
                      message: error.message ?? "Tente novamente mais tarde.",
                    })
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
            const response = await api.delete(`/tasks/${taskId}?userId=${userId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            setSuccess({
                title: response.data?.title ?? "Sucesso",
                message: response.data?.message ?? "",
            })
        } catch (error) {
            setError({
              title: error.title ?? "Erro",
              message: error.message ?? "Tente novamente mais tarde.",
            })
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
            console.log('ADD TASK response',response.data)
            const newTask = new Task(
                response.data.taskId,
                newTaskData.name || '',
                newTaskData.description || '',
                newTaskData.date || '',
                newTaskData.startTime || '',
                newTaskData.endTime || '',
                newTaskData.completed !== undefined ? newTaskData.completed : false,
                newTaskData.favorite !== undefined ? newTaskData.favorite : false,
                Array.isArray(newTaskData.tags) ? newTaskData.tags : []
            );
            setSuccess({
                title: response.data?.title ?? "Sucesso",
                message: response.data?.message ?? "",
            })
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            setError({
              title: error.title ?? "Erro",
              message: error.message ?? "Tente novamente mais tarde.",
            })
            console.error('Erro ao adicionar tarefa:', error);
            setError("Erro ao adicionar a tarefa.");
        } finally {
            stopLoading();
        }
    };

    const updateTask = async (taskId, updatedData) => {
        startLoading();
        try {
            const response = await api.put(`/tasks/${taskId}`, { ...updatedData, userId });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedData } : task
                )
            );
            setSuccess({
                title: response.data?.title ?? "Sucesso",
                message: response.data?.message ?? "",
            })
        } catch (error) {
            setError({
              title: error.title ?? "Erro",
              message: error.message ?? "Tente novamente mais tarde.",
            })
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
