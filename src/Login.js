import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword (email, password)
    } catch (error) {
      alert(error.message)
    }
  }


  
    // forget password
    const forgetPassword = () => {
      firebase.auth().sendPasswordResetEmail(email)
      .then( () => {
        alert("Email para troca de senha enviado")
      }).catch((error) => {
        alert("Digite seu email no campo acima")
      })
    }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize:26}} >
        Login
      </Text>

      <View style={{marginTop:40}}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
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
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
        style={{marginTop: 20}}
      >
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Não tem uma conta? Clique aqui para se registrar!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {forgetPassword()}}
        style={{marginTop: 20,}}>
            <Text style={{fontSize:16, fontWeight: 'bold' }}>
            Esqueci minha senha.
            </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login



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