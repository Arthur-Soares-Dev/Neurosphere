import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import globalStyles, {colors, sizeFonts} from '../../../Styles/GlobalStyle'

const Card = () => {

  return (
    <View style={{width: "100%"}}>
        <View style={styles.menuContainer}>
            <Text style={{fontSize: sizeFonts.MEDIUM, color: colors.YELLOW, fontFamily: 'MinhaFonte',}}>INÍCIO</Text>
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