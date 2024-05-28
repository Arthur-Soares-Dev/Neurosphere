import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, View } from 'react-native';
import { firebase } from '../config';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Undefined'];

const TelaDasCrianca = ({ navigation }) => {
    const [usuario, setUsuario] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedDay, setSelectedDay] = useState(1); // Monday

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            firebase.firestore().collection('users')
                .doc(user.uid).get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUsuario(snapshot.data());
                    } else {
                        console.log('Usuário não existe');
                    }
                })
                .catch((error) => {
                    console.error("Erro ao obter usuário:", error);
                });

            firebase.firestore().collection('users')
                .doc(user.uid).collection('Tasks')
                .onSnapshot((querySnapshot) => {
                    const tasksList = [];
                    querySnapshot.forEach((doc) => {
                        tasksList.push({ ...doc.data(), id: doc.id });
                    });
                    setTasks(tasksList);
                });
        }
    }, []);

    const toggleCompleted = (taskId) => {
        const user = firebase.auth().currentUser;
        const taskRef = firebase.firestore().collection('users').doc(user.uid).collection('Tasks').doc(taskId);
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === taskId) {
                    const newCompletedStatus = !task.completed;
                    taskRef.update({ completed: newCompletedStatus });
                    return { ...task, completed: newCompletedStatus };
                }
                return task;
            })
        );
    };

    const renderItem = ({ item }) => {
        const isSelected = item.id === selectedTaskId;
        const taskStyle = item.completed ? styles.taskContainerCompleted : styles.taskContainer;

        return (
            <TouchableOpacity onPress={() => setSelectedTaskId(isSelected ? null : item.id)}>
                <View style={[taskStyle, { backgroundColor: getColorForTask(item), height: isSelected ? 'auto' : 100 }]}>
                    <Text style={styles.taskTime}>{new Date(item.date).toLocaleDateString()}</Text>
                    <Text style={styles.taskTitle}>{item.name}</Text>
                    <Text style={styles.taskTime}>{new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    {isSelected && (
                        <>
                            <Text style={styles.taskDescription}>{item.description}</Text>
                            {item.tags && item.tags.length > 0 && (
                                <View style={styles.tagsContainer}>
                                    {item.tags.map((tag, index) => (
                                        <View key={index} style={[styles.tag, { backgroundColor: tag.color }]}>
                                            <Text style={styles.tagText}>{tag.text}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                            <TouchableOpacity onPress={() => toggleCompleted(item.id)} style={styles.completeButton}>
                                <Text style={styles.completeButtonText}>{item.completed ? 'Ativar' : 'Concluir'}</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const getColorForTask = (task) => {
        if (task.completed) {
            return '#B0BEC5'; // Corzinha Tarefa Completa - Kai nn sei ce ta bonito?
        }
        const colors = ['#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFECB3'];
        const index = tasks.indexOf(task) % colors.length;
        return colors[index];
    };

    const filteredTasks = tasks.filter(task => {
        if (selectedDay === 7) {
            return !task.date;
        } else {
            const taskDate = new Date(task.date);
            return taskDate.getDay() === selectedDay;
        }
    });

    const handleDayChange = (direction) => {
        setSelectedDay(prevDay => (prevDay + direction + 8) % 8);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleDayChange(-1)} style={styles.arrowButton}>
                    <Text style={styles.arrowButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.greeting}>
                    {daysOfWeek[selectedDay]}
                </Text>
                <TouchableOpacity onPress={() => handleDayChange(1)} style={styles.arrowButton}>
                    <Text style={styles.arrowButtonText}>{">"}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

export default TelaDasCrianca;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    arrowButton: {
        padding: 10,
    },
    arrowButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flex: 1,
        paddingHorizontal: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    taskContainer: {
        marginBottom: 20,
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
    },
    taskContainerCompleted: {
        marginBottom: 20,
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
        opacity: 0.5,
    },
    taskTime: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    taskTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
    },
    taskDescription: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },
    completeButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#78909C',
        alignItems: 'center',
    },
    completeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        marginVertical: 5,
    },
    tagText: {
        color: '#fff',
    },
});
