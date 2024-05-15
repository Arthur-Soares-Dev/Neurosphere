import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Cadastro = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');

  const registerUser = async (email, password, firstName, lastName, childName, childAge) => {
    try {
      if (email && password && firstName && lastName && childName && childAge) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              firstName,
              lastName,
              email,
              childName
            })
              .then(() => {
                alert('Cadastro realizado com sucesso!');
                navigation.navigate('Login');
              })
              .catch((error) => {
                alert(error.message);
              })
          })
          .catch((error) => {
            alert(error.message);
          })
      } else {
        alert('Por favor, preencha todos os campos');
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#026efd', marginTop: 20 }}>Voltar</Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Cadastro</Text>

      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder='Primeiro nome'
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Sobrenome'
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Nome da criança'
          onChangeText={(childName) => setChildName(childName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Idade da criança'
          onChangeText={(childAge) => setChildAge(childAge)}
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName, childName, childAge)}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
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
  },
  button: {
    marginTop: 30,
    height: 50,
    width: 300,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
})

export default Cadastro;
