import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const Dashboard = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);

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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.profileIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Olá, {usuario?.firstName} {usuario?.lastName}!
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => changePassword()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
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
        <Text style={styles.buttonText}>
          Sair
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('TelaDosPais')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Tela dos Pais
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('TelaDasCrianca')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Tela das Crianças
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('FrasesAudio')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Frases
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff', // bola branca
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
  }
});
