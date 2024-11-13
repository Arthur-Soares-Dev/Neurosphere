import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from "../../../enums/ScreenNames";


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
        <TouchableOpacity style={[styles.card, {backgroundColor: '#FD7FAC', borderColor: '#FD7FAC'}]} onPress={() => navigation.navigate(ScreenNames.CREATE_TASK)}>
          <View style={[styles.square, {backgroundColor: 'white', borderRadius: 50}]}>
            <Ionicons name="add-outline" size={40} color="#FD7FAC" />
          </View>
          <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
            Adicionar Tarefa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, {backgroundColor: '#7FACD630', borderColor: '#7FACD6'}]} onPress={() => navigation.navigate(ScreenNames.VIEW_TASKS)}>
          <View style={styles.square}>
            <Ionicons name="list-outline" size={40} color="#006DD2" />
          </View>
          <Text style={{ color: "#006DD2", fontSize: 14, textAlign: 'center' }}>
            Ver {"\n"} Tarefas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(ScreenNames.AUDIO_DIALOGUE)}>
          <View style={styles.square}>
            <Ionicons name="chatbubble-outline" size={40} color="#151515" />
          </View>
          <Text style={{ color: "#151515", fontSize: 14, textAlign: 'center' }}>
            Painel de Frases
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, {backgroundColor: '#FD7FAC30', borderColor: '#FD7FAC'}]} onPress={() => navigation.navigate(ScreenNames.GAMES_LIST)}>
          <View style={styles.square}>
            <Ionicons name="game-controller-outline" size={40} color="#EB0054" />
          </View>
          <Text style={{ color: "#EB0054", fontSize: 14, textAlign: 'center' }}>
            Jogos
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ButtonCards;

const styles = StyleSheet.create({
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
  square: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "transparent",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

