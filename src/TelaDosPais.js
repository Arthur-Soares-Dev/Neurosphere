import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { firebase } from '../config';
import { addDoc, collection } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';

const TelaDosPais = ({ navigation }) => {
    const [usuario, setUsuario] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [category, setCategory] = useState('');
    const user = firebase.auth().currentUser;

    useEffect(() => {
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
        }
    }, []);

    const addTask = async (name, description, date, startTime, endTime, category) => {
        const newCollectionRef = collection(firebase.firestore(), 'users', user.uid, 'Tasks');
        await addDoc(newCollectionRef, {
            name,
            description,
            date: date.toISOString(), // Salvar como string ISO 8601
            startTime: startTime.toISOString(), // Salvar como string ISO 8601
            endTime: endTime.toISOString(), // Salvar como string ISO 8601
            category,
        }).then(() => {
            setName("");
            setDescription("");
            setDate(new Date());
            setStartTime(new Date());
            setEndTime(new Date());
            setCategory("");
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={styles.backButtonCircle} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Add Tasks</Text>
                    
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
                                    setShowDatePicker(Platform.OS === 'ios');
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
                                        setShowStartTimePicker(Platform.OS === 'ios');
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
                                        setShowEndTimePicker(Platform.OS === 'ios');
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
                        <Text style={styles.label}>Add Category</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Category"
                            onChangeText={(category) => setCategory(category)}
                            value={category}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => addTask(name, description, date, startTime, endTime, category)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Create a new task</Text>
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
