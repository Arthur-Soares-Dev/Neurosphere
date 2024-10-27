import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, sizeFonts } from '../../Styles/GlobalStyle';


const GoBackButton = (title) => {

  const navigation = useNavigation();
  
  return (
    <View style = {styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color = {colors.yellow} />
        </TouchableOpacity>

        <Text style = {styles.title}> {title} </Text>
    </View>
  )
}

export default GoBackButton;

const styles = StyleSheet.create({

  container : {
    flexDirection: 'row',
  },
  
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  
  title: {
    fontSize: sizeFonts.medium,
    fontWeight: 'bold',
    marginVertical: 20,
    color: colors.yellow
  },


});