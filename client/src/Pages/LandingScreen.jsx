import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from '../components/BasesComponents/baseButton';
import globalStyles, { colors } from '../Styles/GlobalStyle';
import {ScreenNames} from "../enums/ScreenNames";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>BEM VINDO!</Text>

      <StyledButton
        title="CADASTRAR"
        onPress={() => navigation.navigate(ScreenNames.REGISTER)}
        style={styles.registerButton}
        // textStyle={styles.buttonText}
      />

      <StyledButton
        title="LOGAR"
        onPress={() => navigation.navigate(ScreenNames.LOGIN)}
        style={styles.loginButton}
        // textStyle={styles.buttonText}
      />

      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLUE, // Altere para a cor de fundo desejada
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: colors.YELLOW, // Ajuste de acordo com a cor desejada
    marginBottom: 40,
    fontFamily: 'MinhaFonte', // Altere para a fonte desejada, se houver
  },
  registerButton: {
    backgroundColor: colors.YELLOW,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.YELLOW,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.YELLOW,
    fontSize: 16,
    fontFamily: 'MinhaFonte',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: colors.YELLOW,
    marginTop: 20,
  },
});

export default LandingScreen;
