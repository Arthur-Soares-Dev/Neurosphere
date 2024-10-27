// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#3B8AC4',
  yellow: '#FBAE17',
  green: '#9FDE76',
  pink: '#F76D8E',
  purple: '#A57EDE',
  white: '#FFF6EE',
};

export const sizeFonts = {
  small: 20,
  medium: 24,
};

const globalStyles = StyleSheet.create({

  /* Views */
  outercontainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingVertical: 30,
  },

  container: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  /* Buttons */

  button: {
    width: '100%',
    backgroundColor: colors.pink,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
  },

  buttonText: {
    color: colors.white,
    fontSize: sizeFonts.small,
    fontWeight: 'bold',
  },

  /* Inputs */

  input: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  filledInput: {
    backgroundColor: colors.blue,
  },

  inputText: {
    flex: 1,
    fontSize: sizeFonts.small,
    paddingVertical: 15,
    color: colors.blue,
  },

  filledInputText: {
    color: colors.white,
  },
});

export default globalStyles;
