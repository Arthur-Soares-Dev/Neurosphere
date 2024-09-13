import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card  from './components/AudioDialogue/Card'

const AudioDialogue = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FD7FAC" />
      </TouchableOpacity>
      <Text style={styles.menuContainer}>
        Painel de Frases
      </Text>

        <Card/>

      <TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AudioDialogue

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: 50,
  paddingHorizontal: 10,
  backgroundColor: '#f0f0f0',
},

backButton: {
  marginLeft: 5,
  marginBottom: 10
},

menuContainer: {
  paddingLeft: 10,
  paddingRight: 10,
  alignItems: 'flex-end',
  flexDirection: 'row',
  fontSize: 25,
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
