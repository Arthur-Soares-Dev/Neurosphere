import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTasks } from "../contexts/TasksContext";
import { Task } from "../models/Task";
import Ionicons from '@expo/vector-icons/Ionicons';
import {ScreenNames} from "../enums/ScreenNames";
import GoBackButton from '../components/GoBackButton';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';
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
        const colorValues = [colors.YELLOW, colors.GREEN, colors.PURPLE, colors.PINK, colors.BLUE];
        return colorValues[Math.floor(Math.random() * colorValues.length)];
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
        <SafeAreaView style={globalStyles.outerContainer}>

            <View style={[globalStyles.scrollContainer]}>
                <GoBackButton title={(edit ? 'EDITAR TAREFA' : 'CRIAR TAREFA')}/>
            </View>

            <ScrollView contentContainerStyle={[globalStyles.scrollContainer, {paddingTop: 0}]} keyboardShouldPersistTaps="handled">

                <View style={globalStyles.container}>

                    
                    <Text style={globalStyles.label}>TÍTULO</Text>
                    <StyledInput
                      filled={true}
                      onChangeText={(nameValue) => setNameValue(nameValue)}
                      value={nameValue}
                    />

                    <Text style={globalStyles.label}>DATA</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <View style={globalStyles.input}>
        
                            <Text style={globalStyles.inputText}>{new Date(date).toLocaleDateString('pt-BR')}</Text>
                        
                            {showDatePicker && (
                            <DateTimePicker
                                value={new Date(date)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        </View>
                    </TouchableOpacity>

                    <View style={styles.timeContainer}>

                        <View style={[styles.timeInputContainer]}>
                            <Text style={globalStyles.label}>INÍCIO</Text>
                            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                                <Text style={[globalStyles.inputText, styles.textInput]}>{new Date(startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
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
                            <Text style={globalStyles.label}>FIM</Text>
                            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                                <Text style={[globalStyles.inputText, styles.textInput]}>{new Date(endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
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

                    <Text style={globalStyles.label}>DESCRIÇÃO</Text>
                    <View style={[globalStyles.input, styles.descriptionContainer]}>
                            <StyledInput
                              filled={true}
                              style={{height: 150,textAlignVertical: 'top', width: '100%'}}
                              onChangeText={(text) => setDescription(text)}
                              value={description}
                              maxLength={200}
                              multiline
                            />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={globalStyles.label}>ETIQUETAS</Text>
                        <View style={styles.tagInputContainer}>
                            <View style={{width: '80%'}}>
                                <StyledInput
                                    onChangeText={(text) => setTagInput(text)}
                                    value={tagInput}
                                    onSubmitEditing={handleAddTag}
                                />
                            </View>
                            <View>
                                <TouchableOpacity onPress={handleAddTag} style={styles.plusButton}>
                                    <Ionicons name="add-outline" size={30} color={colors.WHITE} />
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
                                        <Ionicons name="close-outline" size={20} color={colors.WHITE} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>

                    <StyledButton
                        title={edit ? 'Editar' : 'Criar'}
                        onPress={async () => handleAddTask()}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateTaskScreen;

const styles = StyleSheet.create({
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
        borderWidth: 2,
        borderColor: colors.BLUE,
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
        marginBottom: 1,
    },

    plusButton: {
        width: 60,
        backgroundColor: colors.PURPLE,
        borderRadius: 10,
        padding: 15,
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
        backgroundColor: colors.GREEN,
        padding: 8,
        borderRadius: 16,
        marginRight: 8,
    },

    tagText: {
        color: colors.WHITE,
        marginRight: 8,
        fontFamily: 'MinhaFonte'
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
        backgroundColor: colors.BLUE,
        marginBottom: 16
    },
});
