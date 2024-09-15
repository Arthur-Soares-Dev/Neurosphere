import React, {createContext, useContext, useEffect, useState} from 'react';
import {firestore} from '../firebase/firebaseServices';
import {useAuth} from './AuthContext';
import * as Speech from "expo-speech";
import {Task} from '../models/Task';

const TasksContext = createContext();

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const unsubscribe = firestore
                .collection('users')
                .doc(user.uid)
                .collection('Tasks')
                .onSnapshot((querySnapshot) => {
                    const tasksList = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        const task = new Task(
                            doc.id,
                            data.name,
                            data.description,
                            data.date,
                            data.startTime,
                            data.endTime,
                            data.completed,
                            data.favorite,
                            data.tags,
                            data.mensagem,
                            data.emoji
                        );
                        tasksList.push(task);
                    });
                    setTasks(tasksList);
                });

            return () => unsubscribe();
        }
    }, [user]);

    const updateTaskMessageAndEmoji = async (taskId, mensagem, emoji) => {
        try {
            const taskRef = firestore
                .collection('users')
                .doc(user.uid)
                .collection('Tasks')
                .doc(taskId);

            await taskRef.update({
                mensagem: mensagem || '',
                emoji: emoji || ''
            });

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, mensagem, emoji } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar mensagem e emoji:', error);
        }
    };

    const toggleCompleted = (taskId) => {
        const taskRef = firestore
            .collection('users')
            .doc(user.uid)
            .collection('Tasks')
            .doc(taskId);

        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    const newCompletedStatus = !task.completed;
                    taskRef.update({ completed: newCompletedStatus });
                    return { ...task, completed: newCompletedStatus };
                }
                return task;
            })
        );
    };

    const favoriteTask = (taskId) => {
        const taskRef = firestore
            .collection('users')
            .doc(user.uid)
            .collection('Tasks')
            .doc(taskId);

        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    const favoriteStatus = !task.favorite;
                    taskRef.update({ favorite: favoriteStatus });
                    return { ...task, favorite: favoriteStatus };
                }
                return task;
            })
        );
    };

    const deleteTask = (taskId) => {
        firestore
            .collection('users')
            .doc(user.uid)
            .collection('Tasks')
            .doc(taskId)
            .delete();
    };

    const addTask = async (newTaskData) => {
        try {
            const taskRef = firestore
                .collection('users')
                .doc(user.uid)
                .collection('Tasks')
                .doc();

            const newTask = new Task(
                null,
                newTaskData.name || '',
                newTaskData.description || '',
                newTaskData.date || '',
                newTaskData.startTime || '',
                newTaskData.endTime || '',
                newTaskData.completed !== undefined ? newTaskData.completed : false,
                newTaskData.favorite !== undefined ? newTaskData.favorite : false,
                Array.isArray(newTaskData.tags) ? newTaskData.tags : []
            );

            const taskObject = newTask.toPlainObject();

            await taskRef.set(taskObject);
            setTasks((prevTasks) => [...prevTasks, { ...taskObject, id: taskRef.id }]);
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    const updateTask = async (taskId, updatedData) => {
        try {
            const taskRef = firestore
                .collection('users')
                .doc(user.uid)
                .collection('Tasks')
                .doc(taskId);

            const updatedTask = {
                ...updatedData,
                favorite: updatedData.favorite !== undefined ? updatedData.favorite : false,
                tags: Array.isArray(updatedData.tags) ? updatedData.tags : []
            };

            await taskRef.update(updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
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
                updateTaskMessageAndEmoji
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => useContext(TasksContext);
