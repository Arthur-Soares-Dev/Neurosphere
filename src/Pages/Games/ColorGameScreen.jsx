import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles, { colors, sizeFonts } from '../../Styles/GlobalStyle';
import gameStyle from '../../Styles/gameStyle';
import GoBackButton from '../../components/GoBackButton';
import StyledButton from '../../components/BasesComponents/baseButton';
import Hearts from '../../components/GameComponents/hearts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const colorsGuess = ['🔴', '🟢', '🔵', '🟡', '🟣', '🟡', '🟤', '⚫'];

const getRandomSequence = () => {
  return Array(3)
      .fill(null)
      .map(() => colorsGuess[Math.floor(Math.random() * colorsGuess.length)]);
};

const getRandomSequences = (correctSequence) => {
  const sequences = [correctSequence];
  while (sequences.length < 3) {
    const randomSequence = getRandomSequence();
    if (!sequences.some(seq => seq.join() === randomSequence.join())) {
      sequences.push(randomSequence);
    }
  }
  return sequences.sort(() => 0.5 - Math.random());
};

export default function ColorGameScreen() {
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lives, setLives] = useState(3); // Definindo 3 vidas
  const [correctSequence, setCorrectSequence] = useState(getRandomSequence());
  const [options, setOptions] = useState(getRandomSequences(correctSequence));
  const [showSequence, setShowSequence] = useState(true);
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (timer > 0 && showSequence) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && showSequence) {
      setShowSequence(false);
    }
  }, [timer, showSequence]);

  const handleOptionPress = (selectedSequence) => {
    if (selectedSequence.join() === correctSequence.join()) {
      if (round === 3) {
        setSuccess(true);
        setGameOver(true);
      } else {
        setRound(round + 1);
        const newCorrectSequence = getRandomSequence();
        setCorrectSequence(newCorrectSequence);
        setOptions(getRandomSequences(newCorrectSequence));
        setShowSequence(true);
        setTimer(3);
      }
    } else {
      setLives((prevLives) => {
        if (prevLives <= 1) {
          setGameOver(true);
          return 0; // Define vidas como 0 se o jogo acabar
        }
        return prevLives - 1; // Remove uma vida
      });
    }
  };

  const resetGame = () => {
    setRound(1);
    setGameOver(false);
    setSuccess(false);
    setLives(3); // Reinicia as vidas
    const newCorrectSequence = getRandomSequence();
    setCorrectSequence(newCorrectSequence);
    setOptions(getRandomSequences(newCorrectSequence));
    setShowSequence(true);
    setTimer(3);
  };

  if (gameOver) {
    return (
      <SafeAreaView style={globalStyles.outerContainer}>

        <View style={[globalStyles.scrollContainer, { flexGrow: 0, paddingTop: '10%' }]}>
          <GoBackButton title="SEQUÊNCIA COLORIDA" />
        </View>

        <View style={[globalStyles.scrollContainer, { paddingTop: 0, alignItems: 'center' }]}>

          <Text style={[globalStyles.label, {alignSelf: 'center', fontSize: sizeFonts.LARGE}]}>
            {success ? 'PARABÉNS, VOCÊ GANHOU!\n' : 'VOCÊ PERDEU! TENTE DE NOVO!\n'}
          </Text>

          <StyledButton title="REINICIAR JOGO" onPress={resetGame} />

        </View>

      </SafeAreaView>
    );
  }

  return (
    <View style={globalStyles.outerContainer}>

      <View style={[globalStyles.scrollContainer, { flexGrow: 0 }]}>
        <GoBackButton title="SEQUÊNCIA COLORIDA" />
      </View>

      <ScrollView contentContainerStyle={[globalStyles.scrollContainer, { paddingTop: 0 }, gameStyle.container]}>

        <View style={gameStyle.header}>

          <Hearts attempts={3 - lives} />

          <TouchableOpacity 
            onPress={() => resetGame(true)} 
            style={gameStyle.refazerButton}
          >
            <Text style={gameStyle.refazerButtonText}>REFAZER</Text>
            <Ionicons name="refresh-outline" size={20} color={colors.PINK} style={gameStyle.icon} />
          </TouchableOpacity>

        </View>

        <View style={[gameStyle.header, {marginBottom: 20}]}>

          <Text style={gameStyle.points}> RODADA: {round} / 3</Text>

        </View>


      {showSequence ? (
          <>
            <Text style={[globalStyles.label, {alignSelf: 'center', textAlign: 'center', color: colors.PINK}]}>MEMORIZE A SEQUÊNCIA DE CORES:</Text>
            <View style={styles.sequenceContainer}>
              {correctSequence.map((color, index) => (
                  <Text key={index} style={styles.colorBlock}>
                    {color}
                  </Text>
              ))}
            </View>
            <Text style={[globalStyles.label, {alignSelf: 'center', textAlign: 'center'}]}>A SEQUÊNCIA DESAPARECERÁ EM {timer} SEGUNDOS...</Text>
          </>
        ) : (
          <>
            <Text style={[globalStyles.label, {alignSelf: 'center', textAlign: 'center'}]}>ESCOLHA A SEQUÊNCIA CORRETA:</Text>
            <View style={styles.optionsContainer}>
              {options.map((sequence, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleOptionPress(sequence)}>
                  {sequence.map((color, idx) => (
                    <Text key={idx} style={styles.colorBlock}>{color}</Text>
                  ))}
                </TouchableOpacity>
              ))}
            </View>
          </>
      )}
      </ScrollView>
    </View>
);
}

const styles = StyleSheet.create({
  sequenceContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  colorBlock: {
    fontSize: 40,
    marginHorizontal: 10,
  },

  optionsContainer: {
    marginTop: 20,
    width: '100%',
  },

  optionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PURPLE,
    borderRadius: 10,
    
  },

});
