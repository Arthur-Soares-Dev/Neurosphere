import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ButtonCards = () => {
  const navigation = useNavigation();

  return (
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
        <TouchableOpacity style={styles.cardPinkTask} onPress={() => navigation.navigate('TelaDosPais')}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: "white",
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
            <Ionicons name="add-outline" size={40} color="#FD7FAC" />
          </View>
          <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
            Adicionar Tarefa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardBlue} onPress={() => navigation.navigate('TelaDasCrianca')}>
          <View style={styles.square}>
            <Ionicons name="list-outline" size={40} color="#7FACD6" />
          </View>
          <Text style={{ color: "#7FACD6", fontSize: 14, textAlign: 'center' }}>
            Ver {"\n"} Tarefas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AudioDialogue')}>
          <View style={styles.square}>
            <Ionicons name="chatbubble-outline" size={40} color="#353535" />
          </View>
          <Text style={{ color: "#353535", fontSize: 14, textAlign: 'center' }}>
            Painel de Frases
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardBlue} onPress={() => navigation.navigate('Game')}>
          <View style={styles.square}>
            <Ionicons name="game-controller-outline" size={40} color="#7FACD6" />
          </View>
          <Text style={{ color: "#7FACD6", fontSize: 14, textAlign: 'center' }}>
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
  );
}

export default ButtonCards;

const styles = StyleSheet.create({
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
    backgroundColor: '#35353530',
    borderWidth: 2,
    borderColor: '#353535',
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
    backgroundColor: '#FD7FAC30',
    borderWidth: 2,
    borderColor: '#FD7FAC',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardPinkTask: {
    width: 125,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#FD7FAC',
    borderWidth: 2,
    borderColor: '#FD7FAC',
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
    backgroundColor: '#7FACD630',
    borderWidth: 2,
    borderColor: '#7FACD6',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  square: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "transparent",
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

