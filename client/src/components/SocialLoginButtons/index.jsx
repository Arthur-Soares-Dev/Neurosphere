import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, sizeFonts } from '../../Styles/GlobalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';

const SocialLoginButtons = () => {
  return (
    <View style={styles.socialButtonsContainer}>
        <View style={styles.line}/>
      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={30} color={colors.WHITE} style={styles.icon} />
        <Text style={styles.socialTextGoogle}>LOGAR COM O GOOGLE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, styles.socialButtonFacebook]}>
        <Ionicons name="logo-facebook" size={33} color={colors.BLUE} style={styles.icon} />
        <Text style={styles.socialTextFacebook}>LOGAR COM O FACEBOOK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({
  socialButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  line:{
    width: '100%',
    height: 2,
    backgroundColor: colors.BLUE,
    marginBottom: 25,
  },

  socialButton: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.PURPLE,
    borderColor: colors.PURPLE,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  socialTextGoogle: {
    color: colors.WHITE,
    fontSize: sizeFonts.small,
    textAlign: 'center',
    flex: 1,
  },

  socialButtonFacebook: {
    backgroundColor: colors.WHITE,
    borderColor: colors.BLUE,
  },

  socialTextFacebook: {
    color: colors.BLUE,
    fontSize: sizeFonts.small,
    textAlign: 'center', 
    flex: 1,
  },

  icon: {
    position: 'absolute',
    left: 10, 
  },
});
