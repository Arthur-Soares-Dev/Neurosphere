import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, sizeFonts } from '../../Styles/GlobalStyle';

const colorSequence = [colors.BLUE, colors.PINK, colors.PURPLE, colors.YELLOW, colors.GREEN];

const BaseDashCard = ({
    title = '',
    icon = "",
    onPress = () => {},
    cardStyle = [],
    squareStyle = [],
    textStyle = [],
    iconColor = '',
    navigation,
    screenName,
    index = 0,
}) => {
    const cardBackgroundColor = colorSequence[index % colorSequence.length];

    const combinedCardStyle = [
        styles.card,
        { backgroundColor: cardBackgroundColor },
        ...(Array.isArray(cardStyle) ? cardStyle : [cardStyle]),
    ];

    const combinedSquareStyle = [
        styles.square,
        ...(Array.isArray(squareStyle) ? squareStyle : [squareStyle]),
    ];

    const combinedTextStyle = [
        styles.text,
        ...(Array.isArray(textStyle) ? textStyle : [textStyle]),
    ];

    return (
        <TouchableOpacity
            style={combinedCardStyle}
            onPress={() => navigation.navigate(screenName)}
        >

            <View style={combinedSquareStyle}>
                <Ionicons name={icon} size={40} color={iconColor} />
            </View>

            <Text style={combinedTextStyle}>{title}</Text>

        </TouchableOpacity>
    );
};

export default BaseDashCard;

const styles = StyleSheet.create({

    card: {
        width: 125,
        height: 150,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },

    square: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    text: {
        color: colors.WHITE,
        fontSize: sizeFonts.SMALL,
        textAlign: 'center',
        fontFamily: 'MinhaFonte',
    },
});
