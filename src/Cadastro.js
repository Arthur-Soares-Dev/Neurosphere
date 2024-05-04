import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {firebase} from '../config'

const Cadastro = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
    if (!email == '' && !password == '' && !firstName == '' && !lastName == '') {
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(() => { 
      /*firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://neurosphere-132f0.firebaseapp.com',        
      })
      .then(() => {
        alert('Verification email sent')
      }).catch((error) => {
        alert(error.message)
      })
      .then(() => {*/
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email
        })
      //})
    })
    .catch((error) => {
      alert(error.message)
    })
    } else {
      alert('Porfavor, preencha todos os campos')
    }
  }

  return (
    <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>
          Cadastre-se
        </Text>
        <View style={{marginTop: 40}}>
          <TextInput
            style = {styles.textInput}
            placeholder='Primeiro nome'
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect = {false}
          />

          <TextInput
            style = {styles.textInput}
            placeholder='Sobrenome'
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect = {false}
          />

          <TextInput
            style = {styles.textInput}
            placeholder='Email'
            onChangeText={(email) => setEmail(email)}
            autoCorrect = {false}
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
        </View>
        <TouchableOpacity
            onPress={() => registerUser(email, password, firstName, lastName)}
            style={styles.button}
        >
          <Text style={{fontWeight:'bold', fontSize: 22}}>Cadastrar</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Cadastro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  textInput: {
  paddingTop: 20,
  paddingBottom:10,
  width: 400,
  fontSize:20,
  borderBottomWidth:1,
  borderBottomColor: '#3000',
  marginBottom:10,
  textAlign: 'center'
  },
  button:{
    marginTop:50,
    height: 70,
    width:250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50,
    }
})