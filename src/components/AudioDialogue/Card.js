import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react';
import * as Speech from 'expo-speech';
import { cardProps } from './CardProps';

const Card = () => {
    const [texto, setTexto] = useState('inicio');
    const [title, setTitle] = useState(null);
    const [audio, setAudio] = useState(null);
    const [image, setImage] = useState(null);
    const speak = (audio) => {
        const thingToSay = audio;
        options = {
            language: 'pt-BR',
            rate: 0.9
            //Documentação com todas as opções, como volume, velocidade, e essas coisas
            //https://docs.expo.dev/versions/latest/sdk/speech/#speechoptions
        }
        Speech.speak(thingToSay, options);
    }
    const cardList = cardProps.map((template, index) => {
        return (
                <TouchableOpacity key={index} style={styles.button} onPress={() => speak(template.audio)}>
                            <Text style={styles.buttonText}>{template.title}</Text>
                            <Image
                                style={styles.tinyLogo}
                                source={template.uri}
                            />
                    </TouchableOpacity>
          )
    })
    return (
            <ScrollView styles={styles.container}>
            {cardList}
            </ScrollView>
    )
}

export default Card
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
    },
    button: {
        marginTop: 20,
        height: 70,
        width: '100%',
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    tinyLogo: {
      width: 50,
      height: 50,
    }
    });