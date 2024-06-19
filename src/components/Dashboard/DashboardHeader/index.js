import { View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.header}>
        <StatusBar
        barStyle="light-content"
        backgroundColor="#FD7FAC"
        translucent={false}/>
        <View style={styles.profile}></View>
    </View>
  )
}


const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 30,
      backgroundColor: '#FD7FAC',
      paddingLeft: 10,
      marginBottom: 30,
    },

    profile: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
    },
});