import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import * as Speech from 'expo-speech';
import Card  from './components/AudioDialogue/Card'

const AudioDialogue = () => {
  return (
    <SafeAreaView style={styles.container}>
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
