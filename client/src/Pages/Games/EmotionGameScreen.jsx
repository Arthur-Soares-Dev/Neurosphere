import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const emotions = [
  { name: 'Feliz', emoji: '😊', description: 'Quando você se sente alegre e contente.' },
  { name: 'Triste', emoji: '😢', description: 'Quando você se sente infeliz ou desanimado.' },
  { name: 'Raiva', emoji: '😠', description: 'Quando você se sente irritado ou frustrado.' },
  { name: 'Surpresa', emoji: '😲', description: 'Quando algo inesperado acontece.' },
  { name: 'Confusão', emoji: '😕', description: 'Quando você não entende algo.' },
  { name: 'Medo', emoji: '😨', description: 'Quando você se sente assustado ou preocupado.' },
  { name: 'Amor', emoji: '😍', description: 'Quando você sente carinho por alguém.' },
  { name: 'Tédio', emoji: '😴', description: 'Quando você não está se divertindo.' },
  { name: 'Nojo', emoji: '🤢', description: 'Quando você sente aversão a algo.' },
  { name: 'Orgulho', emoji: '😌', description: 'Quando você se sente satisfeito com algo que fez.' },
];

const getRandomEmotions = (correctEmotion, round) => {
  const shuffled = emotions.filter(e => e.name !== correctEmotion.name).sort(() => 0.5 - Math.random());
  const options = [correctEmotion, ...shuffled.slice(0, 2 + Math.floor(round / 2))];
  return options.sort(() => 0.5 - Math.random());
};

export default function EmotionGameScreen() {
  const getNewEmotion = () => {
    let newEmotion;
    do {
      newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    } while (newEmotion === lastEmotion);
    return newEmotion;
  };

  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastEmotion, setLastEmotion] = useState(null);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(10);
  const [correctEmotion, setCorrectEmotion] = useState(getNewEmotion());
  const [options, setOptions] = useState(getRandomEmotions(correctEmotion, round));

  // Animations
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
    // Se perdeu a última vida, termina o jogo
    if (lives === 1) {
      setGameOver(true);
    } else {
      setLives(lives - 1);
      // Passar para a próxima emoção ao falhar
      const newCorrectEmotion = getNewEmotion();
      setLastEmotion(newCorrectEmotion);
      setCorrectEmotion(newCorrectEmotion);
      setOptions(getRandomEmotions(newCorrectEmotion, round));
      setTimer(10); // Reinicia o temporizador aqui ao falhar
      // Incrementar a rodada apenas se não estamos na última rodada
      if (round < 5) {
        setRound(round + 1); // Avança para a próxima rodada aqui
      }
    }
  };

  const handleOptionPress = (selectedEmotion) => {
    if (selectedEmotion.name === correctEmotion.name) {
      const pointsEarned = timer * 10;
      setPoints(points + pointsEarned);
      // Feedback Animation
      Animated.sequence([
        Animated.timing(scaleValue, { toValue: 1.2, duration: 200, useNativeDriver: true }),
        Animated.timing(scaleValue, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      if (round === 5) {
        setSuccess(true);
        setGameOver(true);
      } else {
        // Incrementar a rodada apenas se não estamos na última rodada
        setRound(round + 1);
        // Passar para a próxima emoção ao acertar
        const newCorrectEmotion = getNewEmotion();
        setLastEmotion(newCorrectEmotion);
        setCorrectEmotion(newCorrectEmotion);
        setOptions(getRandomEmotions(newCorrectEmotion, round + 1));
        setTimer(10); // Reinicia o temporizador aqui ao acertar
      }
    } else {
      handleFail();
    }
  };

  const resetGame = () => {
    setRound(1);
    setLives(3);
    setPoints(0);
    setGameOver(false);
    setSuccess(false);
    const newCorrectEmotion = getNewEmotion();
    setLastEmotion(newCorrectEmotion);
    setCorrectEmotion(newCorrectEmotion);
    setOptions(getRandomEmotions(newCorrectEmotion, 1));
    setTimer(10);
  };

  const renderLives = () => {
    return (
        <View style={styles.livesContainer}>
          {Array.from({ length: 3 }, (_, index) => (
              <Text key={index} style={styles.heart}>{index < lives ? '❤️' : '🤍'}</Text>
          ))}
        </View>
    );
  };

  if (gameOver) {
    return (
        <View style={styles.container}>
          <Text style={styles.gameOverText}>{success ? 'Você venceu!' : 'Você perdeu!'}</Text>
          <Text style={styles.pointsText}>Pontuação: {points}</Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>Reiniciar Jogo</Text>
          </TouchableOpacity>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Rodada {round} / 5</Text>
        {renderLives()}
        <Text style={styles.header}>Tempo: {timer}s</Text>
        <Text style={styles.header}>Pontuação: {points}</Text>
        <View style={styles.emojiContainer}>
          <Animated.Text style={[styles.emoji, { transform: [{ scale: scaleValue }] }]} >
            {correctEmotion.emoji}
          </Animated.Text>
        </View>
        <Text style={styles.description}>{correctEmotion.description}</Text>
        <View style={styles.optionsContainer}>
          {options.map((emotion, index) => (
              <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleOptionPress(emotion)}
              >
                <Text style={styles.optionText}>{emotion.name}</Text>
              </TouchableOpacity>
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 26,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  livesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  heart: {
    fontSize: 30,
    marginHorizontal: 5,
  },
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
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#007BFF', // Cor azul para os botões
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
  button: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
