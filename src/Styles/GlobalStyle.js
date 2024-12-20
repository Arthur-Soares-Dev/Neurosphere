// src/styles/globalStyles.js
import {StyleSheet} from 'react-native';

export const colors = Object.freeze(
  {
    BLUE: '#3B8AC4',
    YELLOW: '#FBAE17',
    GREEN: '#9FDE76',
    PINK: '#F76D8E',
    PURPLE: '#A57EDE',
    WHITE: '#FFF6EE',
    GRAY: '#B0B0B0',
  }
);

export const sizeFonts = Object.freeze({
  SMALL: 18,
  MEDIUM: 20,
  LARGE: 24,
});

const globalStyles = StyleSheet.create({

  /* Views */

  outerContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: '17%',
    backgroundColor: colors.WHITE,
    paddingHorizontal: 30,
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
    backgroundColor: colors.PINK,
    padding: 17,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 25,
  },

  buttonText: {
    color: colors.WHITE,
    fontSize: sizeFonts.SMALL,
    fontFamily: 'MinhaFonte'
  },

  /* Textos */

  tittle: {
    color: colors.BLUE,
    fontSize: sizeFonts.SMALL,
    marginBottom: 10,
    fontFamily: 'MinhaFonte'
  },

  label: {
    alignSelf: 'flex-start',
    color: colors.BLUE,
    fontSize: sizeFonts.SMALL,
    marginBottom: 10,
    fontFamily: 'MinhaFonte'
  },

  /* Inputs */

  input: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: colors.WHITE,
    borderColor: colors.BLUE,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  filledInput: {
    backgroundColor: colors.BLUE,
  },

  inputText: {
    flex: 1,
    fontSize: sizeFonts.SMALL,
    paddingVertical: 15,
    color: colors.BLUE,
    fontFamily: 'MinhaFonte'
  },

  filledInputText: {
    color: colors.WHITE,
    fontFamily: 'MinhaFonte'
  },
});

export default globalStyles;
