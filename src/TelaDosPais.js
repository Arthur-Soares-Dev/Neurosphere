import React, { useState, useEffect } from 'react'
import { Text,TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import { firebase } from '../config'

const TelaDosPais = ({ navigation }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const user = firebase.auth().currentUser;
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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                Add Tasks
            </Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Name">

        </TextInput>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.button}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}> 
                Voltar
            </Text>
        </TouchableOpacity>

        </SafeAreaView>

    );
}

export default TelaDosPais

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 300,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#026efd',
        marginBottom: 10,
        textAlign: 'center',
        borderRadius: 5,
        borderColor: '#ccc',
      }
})
