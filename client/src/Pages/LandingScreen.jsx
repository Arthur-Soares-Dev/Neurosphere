import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from '../components/BasesComponents/baseButton';
import globalStyles, { colors } from '../Styles/GlobalStyle';
import { ScreenNames } from "../enums/ScreenNames";
import NeuroSphereLogo from "../components/customSvg/NeuroSphereLogo"
import NeuroSphereLandingPage from '../components/customSvg/NeuroSphereLandingPage';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={[globalStyles.scrollContainer, styles.container]}>

      <NeuroSphereLogo style={styles.icon}/>

      <Text style={[globalStyles.label, styles.welcomeText]}>BEM VINDO!</Text>

      <StyledButton
        title="CADASTRAR"
        onPress={() => navigation.navigate(ScreenNames.REGISTER)}
        style={[globalStyles.button, styles.registerButton]}
        textStyle={[globalStyles.buttonText, styles.registerText]}
      />

      <StyledButton
        title="LOGAR"
        onPress={() => navigation.navigate(ScreenNames.LOGIN)}
        style={[globalStyles.button, styles.loginButton]}
        textStyle={[globalStyles.buttonText, styles.loginText]}
      />

      <View style={styles.line} />

      <NeuroSphereLandingPage style={styles.iconBottom}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLUE,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 30,
    color: colors.YELLOW, 
    marginBottom: 30,
    alignSelf: 'center',
  },

  registerButton: {
    backgroundColor: colors.YELLOW,
    marginBottom: 30,
    paddingVertical: 25,
  },

  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.YELLOW,
    paddingVertical: 25,
  },

  registerText: {
    color: colors.BLUE,
  },

  loginText: {
    color: colors.YELLOW,
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.YELLOW,
    marginTop: 20,
  },

  icon: {
    marginBottom: 10,
  },

  iconBottom: {
    position: 'absolute',
    bottom: -170,
  }
});

export default LandingScreen;
