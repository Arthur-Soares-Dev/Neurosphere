import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {useTasks} from "./contexts/TasksContext"; // Atualize para FontAwesome5 se necessário

const DialogTask = ({ isOpen, onClose, taskId }) => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [textInput, setTextInput] = useState('');

    const emojis = [
        { id: 1, emoji: 'sad-cry', value: '😢' },
        { id: 2, emoji: 'frown', value: '😞' },
        { id: 3, emoji: 'meh', value: '😐' },
        { id: 4, emoji: 'smile', value: '😊' },
        { id: 5, emoji: 'grin', value: '😁' },
    ];

    const { updateTaskMessageAndEmoji, toggleCompleted } = useTasks()

    const handleEmojiSelect = (value) => {
        setSelectedEmoji(value);
    };

    const handleSendFeedback = async() =>{
        try {
            if (!selectedEmoji) {
                alert("Selecione um emoji")
                return
            }
            // await toggleCompleted(taskId)
            await updateTaskMessageAndEmoji(taskId, textInput, selectedEmoji)
            onClose()
            alert('Feedback Enviado')

        } catch (e) {
            console.log("Erro:",e)
        }
    }

    return (
        <Modal visible={isOpen} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Avaliação de Tarefa</Text>

                    <Text style={styles.label}>Como você se sentiu ao realizar essa tarefa?</Text>
                    <View style={styles.emojiContainer}>
                        {emojis.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleEmojiSelect(item.value)}
                                style={[
                                    styles.emojiButton,
                                    selectedEmoji === item.value && styles.selectedEmoji,
                                ]}
                            >
                                <FontAwesome5 name={item.emoji} size={32} color={selectedEmoji === item.value ? '#FF4081' : '#888'} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Descreva como foi</Text>
                    <TextInput
                        style={styles.textInput}
                        value={textInput}
                        onChangeText={setTextInput}
                        placeholder="Escreva algo..."
                        multiline={true}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={() => handleSendFeedback()}>
                        <Text
                            style={styles.submitButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        width: '85%',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF4081',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        alignSelf: 'flex-start',
        marginBottom: 10,
        color: '#FF4081',
    },
    emojiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    emojiButton: {
        padding: 10,
    },
    selectedEmoji: {
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
    },
    textInput: {
        width: '100%',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
    },
    submitButton: {
        backgroundColor: '#87CEFA',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#FFB6C1',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DialogTask;
