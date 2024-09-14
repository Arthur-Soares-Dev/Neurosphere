import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTasks} from './contexts/TasksContext';
import {Task} from "./models/Task";

const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Sem Data'];

const TelaDasCrianca = ({ navigation }) => {
    const { tasks, toggleCompleted, favoriteTask, deleteTask, speakTask, getColorForTask } = useTasks();
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedDay, setSelectedDay] = useState(1);

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

    const renderItem = ({ item }) => {
        if (item.completed === false) {
            const isSelected = item.id === selectedTaskId;
            const taskStyle = item.completed ? styles.taskContainerCompleted : styles.taskContainer;

            return (
                <TouchableOpacity onPress={() => setSelectedTaskId(isSelected ? null : item.id)}>
                    <View style={[taskStyle, { backgroundColor: getColorForTask(item), height: isSelected ? 'auto' : 100 }]}>
                        <Text style={styles.taskTime}>{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
                        <Text style={styles.taskTitle}>{item.name}</Text>
                        <Text style={styles.taskTime}>
                            {new Date(item.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            -
                            {new Date(item.endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                        {item.favorite && (
                            <View style={styles.favoriteIconContainer}>
                                <Ionicons name="star" size={32} color={'white'} />
                            </View>
                        )}
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
                                    <Text style={styles.completeButtonText}>Falar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.completeButton}>
                                    <Text style={styles.completeButtonText}>Deletar tarefa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        const task = new Task(
                                            item.id,
                                            item.name,
                                            item.description,
                                            new Date(item.date),
                                            new Date(item.startTime),
                                            new Date(item.endTime),
                                            item.completed,
                                            item.favorite,
                                            item.tags,
                                        )
                                        navigation.navigate('TelaDosPais', {
                                            task
                                        })
                                    }}
                                    style={styles.completeButton}
                                >
                                    <Text style={styles.completeButtonText}>Editar tarefa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => favoriteTask(item.id)} style={styles.completeButton}>
                                    <Text style={styles.completeButtonText}>{item.favorite ? 'Desfavoritar' : 'Favoritar'} tarefa</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={30} color="black" />
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
            <Toast />
        </SafeAreaView>
    );
}

export default TelaDasCrianca;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25
    },

    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 13,
        borderRadius: 20,
        zIndex: 1,
        marginTop: 22
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

    favoriteIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
