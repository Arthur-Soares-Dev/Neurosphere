import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Card = () => {

  return (
    <View style={{width: "95%"}}>
        <View style={styles.menuContainer}>
            <Text style={{fontSize: 25}}>Início</Text>
        </View>
        <View style={styles.card}>
        </View>
    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 10,
  },

  card: {
    height: 200,
    backgroundColor: '#E3E3E3',
    marginBottom: 17,
    borderRadius: 10,
  },
});