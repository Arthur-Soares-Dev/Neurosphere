import React, { useState, useEffect } from 'react'
import { Text,TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import { firebase } from '../config'

import { addDoc, collection, doc, getDocs } from "firebase/firestore";

const TelaDosPais = ({ navigation }) => {
    const [usuario, setUsuario] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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



    const addTask = async (name, description) => {
        const newCollectionRef = collection(firebase.firestore(), 'users', user.uid, 'Tasks')

        await addDoc(newCollectionRef, {
            name: name,
            description: description,
        }).then(()=>{
            setName("")
            setDescription("")
            
        })
        

        /*firebase.firestore().collection('users').doc(user.uid).update({
            name: name,
            description: description,
        })*/

    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                Add Tasks
            </Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Name"
          onChangeText={(name) => setName(name)}
          value={name}>
        </TextInput>
        <TextInput 
          style={styles.textInput}
          placeholder="Description"
          onChangeText={(description) => setDescription(description)}
          value={description}>
        </TextInput>

        <TouchableOpacity 
        onPress={() => addTask(name, description)}
        style={styles.button}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}> 
                Adiconar Task
            </Text>
        </TouchableOpacity>

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
