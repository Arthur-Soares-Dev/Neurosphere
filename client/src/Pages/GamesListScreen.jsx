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

      <View style={[globalStyles.scrollContainer, { flexGrow: 0}]}>
        <GoBackButton title={"JOGOS"}/>
      </View>

      <ScrollView contentContainerStyle={[globalStyles.scrollContainer, {paddingTop: 0}]}>

        <View style={[globalStyles.container, styles.cardContainer]}>

          <BaseGameCard
              gameTitle="CONTINHAS - JOGO DE MATEMÁTICA"
              score={200}
              navigation={navigation}
              gameScreen={ScreenNames.MATH_GAME}
              index={0}
          />

          <BaseGameCard
              gameTitle="FORCA - JOGO DE PALAVRAS"
              score={100}
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
});

export default GamesListScreen;
