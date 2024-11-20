import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTasks } from "../contexts/TasksContext";
import GoBackButton from '../components/GoBackButton';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';

const FeedbackListScreen = () => {
    const { tasks } = useTasks();

    const filteredTasks = tasks.filter(task => task.emoji);

    // Define a ordem das cores
    const colorSequence = [colors.BLUE, colors.PINK, colors.PURPLE, colors.YELLOW, colors.GREEN];

    // Formatar a data sem o horário
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR'); 
    };

    return (
        <View style={globalStyles.outerContainer}>
            <View style={globalStyles.scrollContainer} >
                <GoBackButton title="LISTA DE FEEDBACKS" />
                <FlatList
                    data={filteredTasks}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View style={[styles.taskContainer, { backgroundColor: colorSequence[index % colorSequence.length] }]}>
                            <View style={styles.header}>
                                <Text style={styles.taskName}>{`TAREFA: ${item.name || "TAREFA SEM NOME"}`}</Text>
                                <Text style={styles.taskDate}>{formatDate(item.date)}</Text>
                            </View>
                            <View style={styles.satisfactionRow}>
                                <View style={styles.emojiContainer}>
                                    <Text style={styles.taskEmoji}>{item.emoji}</Text>
                                </View>
                                <Text style={styles.satisfactionText}>EMOJI DE SATISFAÇÃO</Text>
                            </View>
                            { item.mensagem && (
                                <View>
                                    <Text style={styles.opinionLabel}>Opniao:</Text>
                                    <Text style={styles.taskMessage}>{item.mensagem}</Text>
                                </View>
                            )}
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        width: '100%',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    taskName: {
        fontSize: sizeFonts.SMALL,
        color: colors.WHITE,
        fontFamily: 'MinhaFonte'
    },

    taskDate: {
        fontSize: sizeFonts.SMALL,
        color: colors.WHITE,
        fontFamily: 'MinhaFonte'
    },

    satisfactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },

    emojiContainer: {
        width: 55, 
        height: 55,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    taskEmoji: {
        fontSize: 24,
    },

    satisfactionText: {
        fontSize: sizeFonts.SMALL,
        color: colors.WHITE,
        fontFamily: 'MinhaFonte'
    },

    opinionLabel: {
        fontSize: sizeFonts.SMALL,
        color: colors.WHITE,
        marginTop: 10,
        fontFamily: 'MinhaFonte'
    },

    taskMessage: {
        fontSize: 16,
        color: colors.WHITE,
        textAlign: 'left',
        fontFamily: 'MinhaFonte',
        textAlign:'justify'
    },
});

export default FeedbackListScreen;
