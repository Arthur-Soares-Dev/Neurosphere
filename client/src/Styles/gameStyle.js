// src/styles/globalStyles.js
import {StyleSheet} from 'react-native';
import { colors, sizeFonts } from './GlobalStyle';

const gameStyle = StyleSheet.create({

    container: {
        justifyContent: 'flex-start',
        paddingTop: '17%',
      },
    
      points: {
        color: colors.BLUE,
        fontSize: sizeFonts.SMALL,
        fontFamily: 'MinhaFonte',
        marginVertical: 10,
      },
    
      wordContainer: {
        marginVertical: 20,
        width: '100%',
        alignItems: 'center',
      },
    
      label: {
        fontSize: sizeFonts.MEDIUM
      },
    
      word: {
        fontSize: sizeFonts.LARGE,
        color: colors.BLUE,
        fontFamily: 'MinhaFonte',
      },
    
      input: {
        textAlign: 'center',
        height: 60,
        marginBottom: 25,
        fontFamily: 'MinhaFonte',
        color: colors.BLUE
      },
    
      heartsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
      },
    
      heartIcon: {
        marginRight: 5
      },
    
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      },
    
      refazerButton: {
        borderWidth: 2,
        borderColor: colors.PINK,
        backgroundColor: colors.WHITE,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
      },
    
      refazerButtonText: {
        color: colors.PINK,
        fontSize: sizeFonts.SMALL,
        marginLeft: 5, 
        fontFamily: 'MinhaFonte',
      },
    
      icon: {
        marginLeft: 5,
      },
    
      testedLettersContainer: {
        borderWidth: 2,
        borderColor: colors.PURPLE,
        padding: 10,
        marginTop: 25,
        width: '100%',
        alignItems: 'flex-start',
      },
    
      testedLabel: {
        color: colors.PURPLE,
      },
    
      testedLetters: {
        color: colors.PURPLE,
        fontSize: sizeFonts.SMALL,
        fontFamily: 'MinhaFonte',
        textAlign: 'left',
      },
});

export default gameStyle;
