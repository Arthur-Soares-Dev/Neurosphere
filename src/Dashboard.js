import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'

const Dashboard = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);

  // troca de senha avançada
  const changePassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Email para troca de senha enviado");
      }).catch((error) => {
        alert(error.message);
      });
  };

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
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Olá, {usuario?.firstName} {usuario?.lastName}!
      </Text>

      <TouchableOpacity
        onPress={() => changePassword()}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Trocar Senha
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut()
            .then(() => {
              navigation.navigate('Login');
            })
            .catch((error) => {
              console.error("Erro ao fazer logout:", error);
            });
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Sair
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => navigation.navigate('TelaDosPais')}
      style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Tela dos Pais
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('TelaDasCrianca')}

        style={styles.button}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Tela das Crianças
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
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  }
})
