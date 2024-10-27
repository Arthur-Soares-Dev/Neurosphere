import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { colors, sizeFonts } from '../../Styles/GlobalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';


const SocialLoginButtons = () => {
  
  return (
    <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>

            <Ionicons name="logo-google" size={30} color={colors.white} style={styles.icon}/>

            <Text style={styles.socialTextGoogle}> LOGAR COM O GOOGLE </Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.socialButtonFacebook]}>

            <Ionicons name="logo-facebook" size={30} color={colors.blue} style={styles.icon}/>

            <Text style={styles.socialTextFacebook}> LOGAR COM O FACEBOOK </Text>

        </TouchableOpacity>
    </View>
  )
}

export default SocialLoginButtons;

const styles = StyleSheet.create({

    socialButtonsContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    
    socialButton: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.purple,
        borderColor: colors.purple,
        borderWidth: 2,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center'
    },

    socialTextGoogle: {
        color: colors.white,
        fontSize: sizeFonts.small,
    },

    socialButtonFacebook: {
        backgroundColor: colors.white,
        borderColor: colors.blue,
    },

    socialTextFacebook: {
        color: colors.blue,
        fontSize: sizeFonts.small,
    },

    icon : {
        marginRight: 5,
    },
  
});