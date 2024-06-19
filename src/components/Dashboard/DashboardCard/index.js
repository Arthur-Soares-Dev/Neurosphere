import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Card() {
  return (
    <View style={{width: "95%"}}>
        <View style={styles.menuContainer}>
            <Text style={{fontSize: 25}}>Início</Text>
            <Text style={{fontSize: 15, color: '#353535'}}>Usuário</Text>
        </View>
        <View style={styles.card}>
            <Text> </Text>
        </View>
    </View>
  )
}

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