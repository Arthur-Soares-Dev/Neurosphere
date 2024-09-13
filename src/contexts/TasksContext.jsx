// src/contexts/TasksContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase/firebaseServices'; // Certifique-se de que o caminho está correto
import { useAuth } from './AuthContext'; // Importa o contexto de autenticação

const TasksContext = createContext();

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const { user } = useAuth(); // Usa o contexto de autenticação para obter o usuário

    useEffect(() => {
        if (user) {
            const unsubscribe = firestore
                .collection('users')
                .doc(user.uid)
                .collection('Tasks')
                .onSnapshot((querySnapshot) => {
                    const tasksList = [];
                    querySnapshot.forEach((doc) => {
                        tasksList.push({ ...doc.data(), id: doc.id });
                    });
                    setTasks(tasksList);
                });

            return () => unsubscribe();
        }
    }, [user]);

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

    const addTask = async (newTask) => {
        try {
            const taskRef = firestore
                .collection('users')
                .doc(user.uid)
                .collection('Tasks')
                .doc();
            await taskRef.set(newTask);
            setTasks((prevTasks) => [...prevTasks, { ...newTask, id: taskRef.id }]);
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
            await taskRef.update(updatedData);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedData } : task
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
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
                updateTask
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => useContext(TasksContext);