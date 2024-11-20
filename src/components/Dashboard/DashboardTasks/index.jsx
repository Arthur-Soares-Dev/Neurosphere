import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTasks} from "../../../contexts/TasksContext";

export default function Tasks() {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const { toggleCompleted, deleteTask, tasks, speakTask, getColorForTask } = useTasks()

    const handleToggleCompleted = async (id) => {
        try {
            await toggleCompleted(id)
        } catch (e) {
            console.log("Erro ao completar a tarefa:",e)
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id)
        } catch (e) {
            console.log("Erro ao completar a tarefa:",e)
        }
    }

    const renderItem = ({ item }) => {
        if(item.completed === false){
            const isSelected = item.id === selectedTaskId;
            const taskStyle = item.completed ? styles.taskContainerCompleted : styles.taskContainer;
            return (
                <TouchableOpacity onPress={() => setSelectedTaskId(isSelected ? null : item.id)}>
                    <View style={[taskStyle, { backgroundColor: getColorForTask(item), height: isSelected ? 'auto' : 120 }]}>
                        <Text style={styles.taskTime}>{new Date(item.date).toLocaleDateString()}</Text>
                        <Text style={styles.taskTitle}>{item.name}</Text>
                        <Text style={styles.taskTime}>{new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        {item.favorite ? 
                            <Ionicons style={styles.starIcon} name="star" size={32} color={'white'} />
                         : '' }
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
                                <TouchableOpacity onPress={() => handleToggleCompleted(item.id)} style={styles.completeButton}>
                                    <Text style={styles.completeButtonText}>{item.completed ? 'Ativar' : 'Concluir'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => speakTask(item.name, item.description)} style={styles.completeButton}>
                                    <Text style={styles.completeButtonText}>
                                        Falar
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.completeButton}>
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

    const filteredTasks = tasks.filter(task => {
        return task.favorite === true;
    });

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 10, height: 110, width: "95%" }}>
            <View style={styles.menuContainer}>
            <Text style={{fontSize: 20}}>Tarefas Favoritas</Text>
        </View>
            <FlatList
                vertical={true}
                showsVerticalScrollIndicator={false}
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
            <Toast />
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

    listContainer: {
        paddingLeft: 0,
        paddingRight: 10,
    },

    taskContainer: {
        marginBottom: 20,
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFECB3',
        width: 387,
        marginRight: 10,
    },

    taskContainerCompleted: {
        marginBottom: 20,
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
        opacity: 0.5,
        backgroundColor: '#FFECB3',
        width: 368,
        marginRight: 20,
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

    starIcon: {
        position: "absolute", 
        right: 10, 
        top: 10, 
        zIndex: 1, 
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
        marginTop: 10,
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
