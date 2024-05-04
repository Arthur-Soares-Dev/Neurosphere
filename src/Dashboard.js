import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {firebase} from '../config'

const Dashboard = () => {
  const [usuario, setUsuario] = useState('')

  // troca de senha
  const changePassword = () => {
    firebase.auth().sendPasswordResetEmail (firebase.auth().currentUser.email)
    .then(() => {
      alert("Email para troca de senha enviado")
    }).catch((error) => {
      alert(error)
    })
    }

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists) {
        setUsuario(snapshot.data())
      }
      else {
        console.log('Usuário não existe')
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:20, fontWeight:'bold'}}>
        Olá, {usuario.firstName} {usuario.lastName}!
      </Text>

      <TouchableOpacity
        onPress={() => {changePassword()}}
        style={styles.button}
      >
        <Text style={{fontSize:22, fontWeight: 'bold'}}>
          Trocar senha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {firebase.auth().signOut()}}
        style={styles.button}
      >
        <Text style={{fontSize:22, fontWeight: 'bold'}}>
          Sair
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Dashboard


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
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