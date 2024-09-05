import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import TaskList from './components/Dashboard/DashboardTasks/index'
import Card from './components/Dashboard/DashboardCard/index'
import { useAuth } from './contexts/AuthContext';

const Dashboard = ({ navigation }) => {

  const changePassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Email para troca de senha enviado");
      }).catch((error) => {
        alert(error.message);
      });
  };

  const { user } = useAuth();  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.headerText}>
          Olá, {user?.name}!
        </Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={user?.profileImage ? { uri: user?.profileImage } : require('../assets/default-avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <Card />


      <SafeAreaView style={styles.containerAtalhos}>

        <View style={styles.menuContainer}>
          <Text style={{ fontSize: 20 }}>Atalhos Diários</Text>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          style={{ height: 150 }}
        >
          <TouchableOpacity style={styles.cardPink}
            onPress={() => navigation.navigate('TelaDosPais')}>
            <View style={styles.circle}>
              <Text style={styles.textCircle}>
                +
              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
              Adicionar Tarefa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardBlue}
            onPress={() => navigation.navigate('TelaDasCrianca')}
          >
            <View style={styles.square}>
            </View>
            <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
              Ver {"\n"} Tarefas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('AudioDialogue')}
          >
            <View style={styles.circle}>
              <Text style={{ color: "#FD7FAC", fontSize: 40, marginTop: -6, }}>

              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
              Painel de Frases
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardPink}
            onPress={() => navigation.navigate('CalendarView')}
          >
            <View style={styles.circle}>
              <Text style={{ color: "#FD7FAC", fontSize: 40, marginTop: -6, }}>

              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
              Calendario
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardBlue}
            onPress={() => navigation.navigate('Game')}
          >
            <View style={styles.circle}>
              <Text style={{ color: "#FD7FAC", fontSize: 40, marginTop: -6, }}>

              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
              Jogos
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.card}
            onPress={() => changePassword()}
          >
            <View style={styles.circle}>
              <Text style={{ color: "#FD7FAC", fontSize: 40, marginTop: -6, }}></Text>
            </View>
            <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
              Trocar a {"\n"} Senha
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      </SafeAreaView>

      <TaskList />


    </SafeAreaView>

  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0', // bola branca
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
  containerAtalhos: {
    height: 200
  },
  menuContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scrollContainer: {
    height: 150,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  card: {
    width: 125,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#353535',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardPink: {
    width: 125,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#FD7FAC',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardBlue: {
    width: 125,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#7FACD6',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textCircle: {
    position: 'absolute',
    color: "#FD7FAC",
    fontSize: 40,
    textAlign: 'center'
  },
  square: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
