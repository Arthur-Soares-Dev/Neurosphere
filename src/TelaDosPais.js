import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../config';
import { addDoc, collection } from "firebase/firestore";

const TelaDosPais = ({ navigation }) => {
    const [usuario, setUsuario] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
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
            name: name,
            description: description,
            date: date,
            startTime: startTime,
            endTime: endTime,
            category: category,
        }).then(() => {
            setName("");
            setDescription("");
            setDate("");
            setStartTime("");
            setEndTime("");
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
                        <TextInput
                            style={styles.textInput}
                            placeholder="Date"
                            onChangeText={(date) => setDate(date)}
                            value={date}
                        />
                    </View>
                    
                    <View style={styles.timeContainer}>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>Start Time</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Start Time"
                                onChangeText={(startTime) => setStartTime(startTime)}
                                value={startTime}
                            />
                        </View>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>End Time</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="End Time"
                                onChangeText={(endTime) => setEndTime(endTime)}
                                value={endTime}
                            />
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
