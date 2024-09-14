import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTasks} from "./contexts/TasksContext";
import {Task} from "./models/Task";

const TelaDosPais = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [edit, setEdit] = useState(false);
    const { addTask } = useTasks()

    useEffect(() => {
        if (route.params) {
            console.log('route.params', route.params);
            const { task } = route.params;
            console.log('task', task);

            setName(task.name || '');
            setDescription(task.description || '');

            setDate(task.date ? new Date(task.date) : new Date());
            setStartTime(task.startTime ? new Date(task.startTime) : new Date());
            setEndTime(task.endTime ? new Date(task.endTime) : new Date());

            setTags(Array.isArray(task.tags) ? task.tags : []);
        }
    }, []);



    const getRandomColor = () => {
        const colors = ['#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFECB3'];
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

    const handleAddTask = async (name, description, date, startTime, endTime, tags) => {
        try {
            console.log('TAGS',tags)
            const task = new Task(
                null,
                name,
                description,
                date,
                startTime,
                endTime,
                false,
                false,
                tags
            )
            await addTask(task)
            setName('')
            setDescription('')
            setDate(new Date())
            setStartTime(new Date())
            setEndTime(new Date())
            setTags([])
            setTagInput('')
        } catch (e) {
            console.error('Erro ao adicionar tarefa:',e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={styles.backButtonCircle} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>
                        {(edit ? 'Edit Tasks' : 'Add Tasks')}
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Title"
                            onChangeText={(name) => setName(name)}
                            value={name}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.textInput}>{date.toDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || date;
                                    setShowDatePicker(false);
                                    setDate(currentDate);
                                }}
                            />
                        )}
                    </View>

                    <View style={styles.timeContainer}>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>Start Time</Text>
                            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                                <Text style={styles.textInput}>{startTime.toTimeString().substring(0, 5)}</Text>
                            </TouchableOpacity>
                            {showStartTimePicker && (
                                <DateTimePicker
                                    value={startTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || startTime;
                                        setShowStartTimePicker(false);
                                        setStartTime(currentDate);
                                    }}
                                />
                            )}
                        </View>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>End Time</Text>
                            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                                <Text style={styles.textInput}>{endTime.toTimeString().substring(0, 5)}</Text>
                            </TouchableOpacity>
                            {showEndTimePicker && (
                                <DateTimePicker
                                    value={endTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || endTime;
                                        setShowEndTimePicker(false);
                                        setEndTime(currentDate);
                                    }}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Description"
                            onChangeText={(description) => setDescription(description)}
                            value={description}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tags</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Add a tag"
                            onChangeText={(text) => setTagInput(text)}
                            value={tagInput}
                            onSubmitEditing={handleAddTag}
                        />
                        <FlatList
                            data={tags}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            renderItem={({ item, index }) => (
                                <View style={[styles.tag, { backgroundColor: item.color }]}>
                                    <Text style={styles.tagText}>{item.text}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveTag(index)} style={styles.removeTagButton}>
                                        <Text style={styles.removeTagButtonText}>x</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>

                    <TouchableOpacity onPress={handleAddTag} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleAddTask(name, description, date, startTime, endTime, tags)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            
                            {(edit ? 'Edit the Task' : 'Create a new task')}
                            </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default TelaDosPais;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    backButtonCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#000',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,
        color: '#000',
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    timeInputContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    addButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
        color: '#000',
    },
    removeTagButton: {
        marginLeft: 5,
        borderRadius: 12,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    removeTagButtonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
