import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useTasks} from "../contexts/TasksContext";
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';

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

                    <View style = {styles.container}>

                        <TouchableOpacity style = {styles.closebutton} onPress={onClose}>
                            <Ionicons name="close-outline" size={30} color={colors.YELLOW} />
                        </TouchableOpacity>

                        <Text style={[globalStyles.tittle, styles.title]}>AVALIAÇÃO DA TAREFA</Text>

                    </View>

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
                                <FontAwesome5 name={item.emoji} size={32} color={selectedEmoji === item.value ? colors.PINK : colors.BLUE} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[globalStyles.label, styles.label]}>DESCREVA COMO FOI A REALIZAÇÃO DA TAREFA:</Text>
                    <TextInput
                        style={[globalStyles.input, styles.textInput, globalStyles.inputText]}
                        value={textInput}
                        onChangeText={setTextInput}
                        multiline={true}
                    />

                    <TouchableOpacity style={globalStyles.button} onPress={() => handleSendFeedback()}>
                        <Text
                            style={globalStyles.buttonText}>ENVIAR</Text>
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
        backgroundColor: colors.WHITE,
        padding: 30,
        paddingBottom: 65,
        borderRadius: 10,
        width: '85%',
        alignItems: 'center',
    },

    title: {
        color: colors.YELLOW,
        marginBottom: 20,
        marginRight: '17%',
    },

    label: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },

    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    closebutton: {
        marginBottom: 20,
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
        backgroundColor: '#ffdbe6',
        borderRadius: 50,
    },
    
    textInput: {
        padding: 10,
        borderRadius: 5,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
});

export default DialogTask;
