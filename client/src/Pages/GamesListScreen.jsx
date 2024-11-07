import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {ScreenNames} from "../enums/ScreenNames";
import GoBackButton from '../components/GoBackButton';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';
import BaseGameCard from '../components/BasesComponents/baseGameCard';

const GamesListScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.outerContainer}>

      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>

        <View style={[globalStyles.container, styles.cardContainer]}>

          <GoBackButton title={"JOGOS"}/>
          
          <BaseGameCard
              gameTitle="CONTINHAS - JOGO DE MATEMÁTICA"
              score={200}
              navigation={navigation}
              gameScreen={ScreenNames.MATH_GAME}
              index={0}
          />

          <BaseGameCard
              gameTitle="FORCA - JOGO DE PALAVRAS"
              score={1000}
              navigation={navigation}
              gameScreen={ScreenNames.WORD_GAME}
              index={1}
          />

          <BaseGameCard
              gameTitle="SEQUÊNCIA COLORIDA - JOGO DAS CORES"
              score={1000}
              navigation={navigation}
              gameScreen={ScreenNames.COLOR_GAME}
              index={2}
          />

          <BaseGameCard
              gameTitle="EMOCIONÁRIO - DICIONÁRIO DAS EMOÇÕES"
              score={1000}
              navigation={navigation}
              gameScreen={ScreenNames.EMOTION_GAME}
              index={3}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GamesListScreen;
