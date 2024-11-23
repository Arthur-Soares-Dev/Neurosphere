import React, { useState, useEffect } from 'react';
import { View, Text, Animated, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles, { colors, sizeFonts } from '../../Styles/GlobalStyle';
import gameStyle from '../../Styles/gameStyle';
import GoBackButton from '../../components/GoBackButton';
import StyledButton from '../../components/BasesComponents/baseButton';
import Hearts from '../../components/GameComponents/hearts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const emotions = [
  { name: 'FELIZ', emoji: '😊', description: 'Quando você se sente alegre e contente.' },
  { name: 'TRISTE', emoji: '😢', description: 'Quando você se sente infeliz ou desanimado.' },
  { name: 'RAIVA', emoji: '😠', description: 'Quando você se sente irritado ou frustrado.' },
  { name: 'SURPRESA', emoji: '😲', description: 'Quando algo inesperado acontece.' },
  { name: 'CONFUSÃO', emoji: '😕', description: 'Quando você não entende algo.' },
  { name: 'MEDO', emoji: '😨', description: 'Quando você se sente assustado ou preocupado.' },
  { name: 'AMOR', emoji: '😍', description: 'Quando você sente carinho por alguém.' },
  { name: 'TÉDIO', emoji: '😴', description: 'Quando você não está se divertindo.' },
  { name: 'NOJO', emoji: '🤢', description: 'Quando você sente aversão a algo.' },
  { name: 'ORGULHO', emoji: '😌', description: 'Quando você se sente satisfeito com algo que fez.' },
];

const getRandomEmotions = (correctEmotion) => {
  const shuffled = emotions
    .filter(e => e.name !== correctEmotion.name)
    .sort(() => 0.5 - Math.random());

  const options = [correctEmotion, ...shuffled.slice(0, 2)];
  return options.sort(() => 0.5 - Math.random());
};

export default function EmotionGameScreen() {
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(10);
  const [correctEmotion, setCorrectEmotion] = useState(emotions[Math.floor(Math.random() * emotions.length)]);
  const [options, setOptions] = useState(getRandomEmotions(correctEmotion));
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    if (timer === 0) {
      handleFail();
    }
    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleFail = () => {
    if (lives === 1) {
      setGameOver(true);
    } else {
      setLives(lives - 1);
      startNewRound();
    }
  };

  const handleOptionPress = (selectedEmotion) => {
    if (selectedEmotion.name === correctEmotion.name) {
      const pointsEarned = timer * 2;
      setPoints(points + pointsEarned);
      Animated.sequence([
        Animated.timing(scaleValue, { toValue: 1.2, duration: 200, useNativeDriver: true }),
        Animated.timing(scaleValue, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      if (round === 5) {
        setSuccess(true);
        setGameOver(true);
      } else {
        setRound(round + 1);
        startNewRound();
      }
    } else {
      handleFail();
    }
  };

  const startNewRound = () => {
    const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCorrectEmotion(newEmotion);
    setOptions(getRandomEmotions(newEmotion));
    setTimer(10);
  };

  const resetGame = () => {
    setRound(1);
    setLives(3);
    setPoints(0);
    setGameOver(false);
    setSuccess(false);
    startNewRound();
  };

  if (gameOver) {
    return (
      <SafeAreaView style={globalStyles.outerContainer}>

      <View style={[globalStyles.scrollContainer, { flexGrow: 0, paddingTop: '10%' }]}>
        <GoBackButton title="EMOCIONÁRIO" />
      </View>

      <View style={[globalStyles.scrollContainer, { paddingTop: 0, alignItems: 'center' }]}>

        <Text style={[globalStyles.label, {alignSelf: 'center', fontSize: sizeFonts.LARGE}]}>
          {success ? 'VOCÊ VENCEU, PARABÉNS!' : 'NÃO FOI DESSA VEZ!\n TENTE DE NOVO'}
        </Text>
        <Text style={[gameStyle.points,  {alignSelf: 'center', fontSize: sizeFonts.LARGE, marginBottom: 30}]}>
          PONTOS: {points}
        </Text>
        
        <StyledButton title="REINICIAR JOGO" onPress={resetGame} />

      </View>

      </SafeAreaView>
    );
  }

  return (
    <View style={globalStyles.outerContainer}>

      <View style={[globalStyles.scrollContainer, { flexGrow: 0 }]}>
        <GoBackButton title="EMOCIONÁRIO" />
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

        <View style={gameStyle.header}>

          <Text style={gameStyle.points}> RODADA: {round} / 5</Text>

          <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="time-outline" size={30} color={colors.PINK} style={gameStyle.icon} />
            <Text style={[gameStyle.points, {color: colors.PINK, fontSize: sizeFonts.MEDIUM}]}> TEMPO: {timer}s</Text>
          </View>
        </View>

        <Text style={gameStyle.points}> PONTOS: {points}</Text>

        <View style={styles.emojiContainer}>

          <Animated.Text style={[styles.emoji, { transform: [{ scale: scaleValue }] }]}>
            {correctEmotion.emoji}
          </Animated.Text>

        </View>

        <Text style={[globalStyles.label, {alignSelf: 'center', textAlign: 'center'}]}> {correctEmotion.description} </Text>

        <View style={styles.optionsContainer}>
          {options.map((emotion, index) => (
            <StyledButton
              key={index}
              title={emotion.name}
              onPress={() => handleOptionPress(emotion)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  emoji: {
    fontSize: 100,
  },

  description: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: '#555',
  },

  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },

  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF0000',
  },

  pointsText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
