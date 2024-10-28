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
  // outercontainer: {
  //   flex: 1,
  //   
  //   backgroundColor: colors.white,
  //   justifyContent: 'center',
  //    alignItems: 'center',
  // },

  outerContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: '20%',
    backgroundColor: colors.white,
    paddingHorizontal: 19,
  },

  container: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  /* Buttons */

  button: {
    width: '100%',
    backgroundColor: colors.pink,
    padding: 17,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 25,
  },

  buttonText: {
    color: colors.white,
    fontSize: sizeFonts.small,
    fontWeight: 'bold',
  },

  /* Textos */

  label: {
    alignSelf: 'flex-start',
    color: colors.blue,
    fontSize: sizeFonts.small,
    marginBottom: 10,
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
    borderRadius: 10,
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
