import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTasks } from "../contexts/TasksContext";
import { Task } from "../models/Task";
import Ionicons from '@expo/vector-icons/Ionicons';
import {ScreenNames} from "../enums/ScreenNames";
import StyledInput from "../components/BasesComponents/baseInput";
import StyledButton from "../components/BasesComponents/baseButton";

const CreateTaskScreen = ({ route, navigation }) => {
    const [nameValue, setNameValue] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString());
    const [startTime, setStartTime] = useState(new Date().toISOString());
    const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 5 * 60 * 1000).toISOString()); // 5 minutos à frente
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [edit, setEdit] = useState(false);
    const [taskId, setTaskId] = useState('');
    const { addTask, updateTask } = useTasks();

    useEffect(() => {
        if (route.params) {
            const { task } = route.params;
            setEdit(true);
            setTaskId(task.id);
            setNameValue(task.name || '');
            setDescription(task.description || '');
            setDate(task.date || new Date().toISOString());
            setStartTime(task.startTime || new Date().toISOString());
            setEndTime(task.endTime || new Date(new Date(task.startTime).getTime() + 5 * 60 * 1000).toISOString());
            setTags(Array.isArray(task.tags) ? task.tags : []);
        }
    }, [route.params]);

    useEffect(() => {
        // Atualiza endTime quando startTime mudar
        if (startTime) {
            const start = new Date(startTime);
            const end = new Date(start.getTime() + 5 * 60 * 1000);
            setEndTime(end.toISOString());
        }
    }, [startTime]);

    const getRandomColor = () => {
        const colors = ['#7FACD630', '#FD7FAC30', '#35353530'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleAddTag = () => {
        if (tagInput.trim() !== "") {
            setTags([...tags, { text: tagInput.trim(), color: getRandomColor() }]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    const handleAddTask = async () => {
        try {
            const task = new Task(
                null,
                nameValue,
                description,
                date,
                startTime,
                endTime,
                false,
                false,
                tags
            );

            if (edit) {
                await updateTask(taskId, task.toPlainObject());
                navigation.navigate(ScreenNames.VIEW_TASKS);
            } else {
                await addTask(task.toPlainObject());
            }

            console.log('Tarefa criada:', task); // Confirmação de valor

            // Resetar valores dos inputs
            setNameValue('');
            setDescription('');
            setDate(new Date().toISOString());
            setStartTime(new Date().toISOString());
            setEndTime(new Date(new Date().getTime() + 5 * 60 * 1000).toISOString());
            setTags([]);
            setTagInput('');
        } catch (e) {
            console.error('Erro ao adicionar tarefa:', e);
        }
    };


    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setDate(new Date(selectedDate).toISOString());
        }
        setShowDatePicker(false);
    };

    const handleStartTimeChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setStartTime(new Date(selectedDate).toISOString());
        }
        setShowStartTimePicker(false);
    };

    const handleEndTimeChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            setEndTime(new Date(selectedDate).toISOString());
        }
        setShowEndTimePicker(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#FD7FAC" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
                <View>
                    <Text style={styles.title}>
                        {(edit ? 'Editar Tarefa' : 'Criar Tarefa')}
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Título</Text>
                    </View>
                    <StyledInput
                      placeholder="Nome"
                      onChangeText={(nameValue) => setNameValue(nameValue)}
                      value={nameValue}
                    />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Data</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.textInput}>{new Date(date).toLocaleDateString('pt-BR')}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date(date)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>

                    <View style={styles.timeContainer}>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>Início</Text>
                            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                                <Text style={styles.textInput}>{new Date(startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
                            </TouchableOpacity>
                            {showStartTimePicker && (
                                <DateTimePicker
                                    value={new Date(startTime)}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleStartTimeChange}
                                />
                            )}
                        </View>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>Fim</Text>
                            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                                <Text style={styles.textInput}>{new Date(endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
                            </TouchableOpacity>
                            {showEndTimePicker && (
                                <DateTimePicker
                                    value={new Date(endTime)}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleEndTimeChange}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Descrição</Text>
                        <View style={styles.descriptionContainer}>
                            <StyledInput
                              filled={true}
                              style={{height: 150,textAlignVertical: 'top', width: '100%',padding: 12}}
                              placeholder="Descrição"
                              onChangeText={(text) => setDescription(text)}
                              value={description}
                              maxLength={200}
                              multiline
                            />
                            <Text style={styles.characterCount}>{description.length}/200</Text>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Etiqueta</Text>
                        <View style={styles.tagInputContainer}>
                            <View style={{width: '80%'}}>
                                <StyledInput
                                    placeholder="Adicionar Etiqueta"
                                    onChangeText={(text) => setTagInput(text)}
                                    value={tagInput}
                                    onSubmitEditing={handleAddTag}
                                />
                            </View>
                            <View>
                                <TouchableOpacity onPress={handleAddTag} style={styles.plusButton}>
                                    <Ionicons name="add-outline" size={30} color="#353535" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            data={tags}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            renderItem={({ item, index }) => (
                                <View style={[styles.tag, { backgroundColor: item.color }]} key={index}>
                                    <Text style={styles.tagText}>{item.text}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveTag(index)} style={styles.removeTagButton}>
                                        <Ionicons name="close-outline" size={20} color="#353535" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>

                    <StyledButton
                        title={edit ? 'Editar' : 'Criar'}
                        onPress={async () => handleAddTask()}
                        blueBackground={true}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateTaskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    scrollContainer: {
        flexGrow: 1,
        marginVertical: 20
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#FD7FAC',
        marginBottom: 8,
    },
    textInput: {
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f4f4f4',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    timeInputContainer: {
        flex: 1,
        marginRight: 8,
    },
    tagInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    plusButton: {
        width: 60,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        padding: 10,
        marginLeft: 8,
        justifyContent: 'center', 
        alignItems: 'center',
        height: 'auto'
    },
    plusButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BBDEFB',
        padding: 8,
        borderRadius: 16,
        marginRight: 8,
    },
    tagText: {
        color: '#353535',
        marginRight: 8,
    },
    removeTagButton: {
        borderRadius: 10,
        width: 25,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeTagButtonText: {
        color: 'black',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#7FACD6',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    descriptionContainer: {
        position: 'relative',
    },
    descriptionInput: {
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f4f4f4',
        height: 150,
        textAlignVertical: 'top',
    },
    characterCount: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        color: '#353535',
        fontSize: 12,
    },
});
