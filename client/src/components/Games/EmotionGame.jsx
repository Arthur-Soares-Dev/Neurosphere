import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const emotions = [
  { name: 'Feliz', emoji: '😃' },
  { name: 'Triste', emoji: '😢' },
  { name: 'Raiva', emoji: '😠' },
  { name: 'Surpresa', emoji: '😲' },
  { name: 'Confusão', emoji: '😕' },
];

const getRandomEmotions = (correctEmotion) => {
  const shuffled = emotions.filter(e => e.name !== correctEmotion.name)
    .sort(() => 0.5 - Math.random());
  
  // Garantindo que a opção correta esteja incluída
  const options = [correctEmotion, ...shuffled.slice(0, 2)];
  
  // Embaralha as opções para não ter uma ordem fixa
  return options.sort(() => 0.5 - Math.random());
};

export default function EmotionGame() {
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  const [correctEmotion, setCorrectEmotion] = useState(
    emotions[Math.floor(Math.random() * emotions.length)]
  );
  const [options, setOptions] = useState(getRandomEmotions(correctEmotion));

  const handleOptionPress = (selectedEmotion) => {
    if (selectedEmotion.name === correctEmotion.name) {
      if (round === 5) {
        setSuccess(true);
        setGameOver(true);
      } else {
        setRound(round + 1);
        const newCorrectEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setCorrectEmotion(newCorrectEmotion);
        setOptions(getRandomEmotions(newCorrectEmotion));
      }
    } else {
      if (lives === 1) {
        setGameOver(true);
      } else {
        setLives(lives - 1);
      }
    }
  };

  const resetGame = () => {
    setRound(1);
    setLives(3);
    setGameOver(false);
    setSuccess(false);
    const newCorrectEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCorrectEmotion(newCorrectEmotion);
    setOptions(getRandomEmotions(newCorrectEmotion));
  };

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOverText}>{success ? 'Sucesso!' : 'Fracasso!'}</Text>
        <TouchableOpacity onPress={resetGame} style={styles.button}>
          <Text style={styles.buttonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rodada {round} / 5</Text>
      <Text style={styles.header}>Vidas: {lives}</Text>
      <Text style={styles.emoji}>{correctEmotion.emoji}</Text>
      <View style={styles.optionsContainer}>
        {options.map((emotion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionPress(emotion)}
          >
            <Text style={styles.emojiOption}>{emotion.emoji}</Text>
            <Text>{emotion.name}</Text>
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
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 100,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 30,
  },
  optionButton: {
    alignItems: 'center',
  },
  emojiOption: {
    fontSize: 50,
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
