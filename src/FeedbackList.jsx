import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {useTasks} from "./contexts/TasksContext";

const FeedbackList = () => {
    const { tasks } = useTasks();

    const filteredTasks = tasks.filter(task => task.emoji);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Feedbacks</Text>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text style={styles.taskName}>{item.name || "Tarefa sem nome"}</Text>
                        <Text style={styles.taskEmoji}>{item.emoji}</Text>
                        { item.mensagem &&
                            <Text style={styles.taskMessage}>{item.mensagem}</Text>
                        }
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF4081',
        marginBottom: 20,
    },
    taskContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    taskName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    taskEmoji: {
        fontSize: 28,
        marginBottom: 10,
    },
    taskMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default FeedbackList;
