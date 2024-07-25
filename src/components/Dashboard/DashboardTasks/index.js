import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, View } from 'react-native';
import { firebase } from '../../../../config.js';
import * as Speech from 'expo-speech';
import Toast from 'react-native-toast-message';

export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const user = firebase.auth().currentUser;

    useEffect(() => {
        if (user) {
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
        //Alert que peguei do site do npm
        //https://github.com/calintamas/react-native-toast-message/tree/fd3a03ad2b5f447c613bf9eb41c91549528009cb
        Toast.show({
            type: 'success',
            text1: 'Tarefa concluída com sucesso',
          });
    };

    const speakTask = (speakName, speakDescription) => {
        const thingToSay = `Nome da tarefa: ${speakName}. Descrição da tarefa: ${speakDescription}.`;
        options = {
            rate: 0.8,
            language: 'pt-BR'
            //Documentação com todas as opções, como volume, velocidade, e essas coisas
            //https://docs.expo.dev/versions/latest/sdk/speech/#speechoptions
        }
        Speech.speak(thingToSay, options);
    }

    function deleteTask(id) {
        firebase.firestore().collection('users').doc(user.uid).collection('Tasks').doc(id).delete();
        //Alert que peguei do site do npm
        //https://github.com/calintamas/react-native-toast-message/tree/fd3a03ad2b5f447c613bf9eb41c91549528009cb
        Toast.show({
            type: 'success',
            text1: 'Tarefa excluída com sucesso',
          });
    }

    const renderItem = ({ item }) => {
        if(item.completed == false){
            const isSelected = item.id === selectedTaskId;
            const taskStyle = item.completed ? styles.taskContainerCompleted : styles.taskContainer;
            return (
                <TouchableOpacity onPress={() => setSelectedTaskId(isSelected ? null : item.id)}>
                    <View style={[taskStyle, { backgroundColor: getColorForTask(item), height: isSelected ? 'auto' : 100, width: 368, marginRight: 20 }]}>
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
                                <TouchableOpacity onPress={() => speakTask(item.name, item.description)} style={styles.completeButton}>
                                    <Text style={styles.completeButtonText}>
                                        Falar
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.completeButton}>
                                    <Text style={styles.completeButtonText}>
                                        Deletar tarefa
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            );
        }
    };

    const getColorForTask = (task) => {
        if (task.completed) {
            return '#B0BEC5'; // Corzinha Tarefa Completa - Kai nn sei ce ta bonito?
        }
        const colors = ['#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFECB3'];
        const index = tasks.indexOf(task) % colors.length;
        return colors[index];
    };

    //Opção com apenas as tarefas do dia, com horário posterior ao atual, ordenadas por horário de início
    // const filteredTasks = tasks.filter(task => {
    //     const now = new Date();
    //     const taskStartTime = new Date(task.startTime);
    //     return taskStartTime.toDateString() === now.toDateString() && taskStartTime > now;
    // }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    //Opção com todas as tasks do dia para teste de layout
    const filteredTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.getDay();
    });

    return (
        <SafeAreaView style={{width: "95%", minHeight: 180, marginTop: 10}}>
            <View style={styles.menuContainer}>
            <Text style={{fontSize: 20}}>Tarefas Diárias</Text>
        </View>
        <SafeAreaView style={styles.container}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContainer}
            />
            <Toast />
        </SafeAreaView>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({

    menuContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        marginBottom: 17,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 20,
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
