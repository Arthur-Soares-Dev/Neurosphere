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
              gameTitle="CONTINHAS"
              navigation={navigation}
              gameScreen={ScreenNames.MATH_GAME}
              tema={"JOGO DE MATEMÁTICA"}
              index={0}
          />

          <BaseGameCard
              gameTitle="FORCA"
              navigation={navigation}
              gameScreen={ScreenNames.WORD_GAME}
              tema={"JOGO DE PALAVRAS"}
              index={1}
          />

          <BaseGameCard
              gameTitle="SEQUÊNCIA COLORIDA"
              navigation={navigation}
              gameScreen={ScreenNames.COLOR_GAME}
              tema={"JOGO DAS CORES"}
              index={2}
          />

          <BaseGameCard
              gameTitle="EMOCIONÁRIO"
              navigation={navigation}
              gameScreen={ScreenNames.EMOTION_GAME}
              tema={"DICIONÁRIO DAS EMOÇÕES"}
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
