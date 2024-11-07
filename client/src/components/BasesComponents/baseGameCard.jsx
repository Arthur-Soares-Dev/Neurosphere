import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles, { colors, sizeFonts } from '../../Styles/GlobalStyle';

const colorOrder = [colors.BLUE, colors.PINK, colors.PURPLE, colors.GREEN, colors.YELLOW];

const BaseGameCard = ({ style = [], index = 0, ...props }) => {
    const {
        gameTitle,
        score,
        navigation,
        gameScreen,
    } = props;

    // Função para navegar para a tela do jogo
    const handlePress = () => {
        if (navigation && gameScreen) {
            navigation.navigate(gameScreen);
        }
    };

    // Definir a cor com base no índice, usando a ordem de cores
    const backgroundColor = colorOrder[index % colorOrder.length];
    const cardStyles = [styles.card, { backgroundColor }, ...(Array.isArray(style) ? style : [style])];

    return (
        <TouchableOpacity style={cardStyles} onPress={handlePress}>
            <View style={styles.iconContainer}>
                <Ionicons name="play" size={24} color={colors.WHITE} />
            </View>
            <Text style={styles.scoreText}>MAIOR PONTUACAO: {score}</Text>
            <Text style={styles.gameTitle}>{gameTitle}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.BLUE,
        borderRadius: 10,
        padding: 16,
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 30,
        
    },

    iconContainer: {
        marginBottom: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.WHITE,
        padding: 10,
    },

    scoreText: {
        color: colors.WHITE,
        fontSize: sizeFonts.SMALL,
        marginBottom: 4,
        fontFamily: 'MinhaFonte'
    },
    gameTitle: {
        color: colors.WHITE,
        fontSize: sizeFonts.MEDIUM,
        fontFamily: 'MinhaFonte'
    },
});

export default BaseGameCard;
