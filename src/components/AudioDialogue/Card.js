// import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
// import React, { useState } from 'react';
// import * as Speech from 'expo-speech';
// import { cardProps } from './CardProps';

// const Card = () => {
//     const [texto, setTexto] = useState('inicio');
//     const [title, setTitle] = useState(null);
//     const [audio, setAudio] = useState(null);
//     const [image, setImage] = useState(null);
//     const speak = (audio) => {
//         const thingToSay = audio;
//         options = {
//             language: 'pt-BR',
//             rate: 0.9
//             //Documentação com todas as opções, como volume, velocidade, e essas coisas
//             //https://docs.expo.dev/versions/latest/sdk/speech/#speechoptions
//         }
//         Speech.speak(thingToSay, options);
//     }
//     const cardList = cardProps.map((template, index) => {
//         return (
//             <TouchableOpacity key={index} style={styles.button} onPress={() => speak(template.audio)}>
//                 <Text style={styles.buttonText}>{template.title}</Text>
//                 <Image
//                     style={styles.tinyLogo}
//                     source={template.uri}
//                 />
//             </TouchableOpacity>
//         )
//     })
//     return (
//         <ScrollView styles={styles.container}>
//         {cardList}
//         </ScrollView>
//     )
// }

// export default Card
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         paddingTop: 20,
//         paddingHorizontal: 20,
//         backgroundColor: '#f0f0f0',
//     },
//     button: {
//         marginTop: 20,
//         height: 125,
//         width: 150,
//         backgroundColor: '#026efd',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 15,
//     },
//     buttonText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     tinyLogo: {
//       width: 50,
//       height: 50,
//     }
//     });

import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import * as Speech from 'expo-speech';
import { cardProps } from './CardProps';

const Card = () => {
    const borderColors = ['#FD7FAC', '#7FACD6', '#353535'];

    const speak = (audio) => {
        const thingToSay = audio;
        const options = {
            language: 'pt-BR',
            rate: 0.9,
        };
        Speech.speak(thingToSay, options);
    };

    const renderItem = ({ item, index }) => {
        const borderColor = borderColors[index % borderColors.length];

        return (
            <TouchableOpacity
                style={[styles.button, { borderColor: borderColor }]}
                onPress={() => speak(item.audio)}
            >
                <Text style={styles.buttonText}>{item.title}</Text>
                <Image style={styles.tinyLogo} source={item.uri} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cardProps}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f0f0f0',
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#f0f0f0', 
        borderColor: '#026efd', 
        borderWidth: 2, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#353535', 
        marginBottom: 20,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});



