import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const colors = ['🔴', '🟢', '🔵', '🟡', '🟣', '🟡', '🟤', '⚫'];

const getRandomSequence = () => {
  return Array(3)
      .fill(null)
      .map(() => colors[Math.floor(Math.random() * colors.length)]);
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

export default function ColorSequenceGame() {
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
        <View style={styles.container}>
          <Text style={styles.gameOverText}>
            {success ? '🎉 Parabéns, você ganhou! 🎉' : '😢 Você errou! Tente de novo!'}
          </Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>Reiniciar Jogo</Text>
          </TouchableOpacity>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Rodada {round} / 3</Text>

        <View style={styles.livesContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
              <Text key={index} style={lives > index ? styles.heart : styles.outlinedHeart}>
                {lives > index ? '❤️' : '🤍'} {/* Coração vermelho ou coração branco */}
              </Text>
          ))}
        </View>

        {showSequence ? (
            <>
              <Text style={styles.subHeader}>Memorize a sequência de cores:</Text>
              <View style={styles.sequenceContainer}>
                {correctSequence.map((color, index) => (
                    <Text key={index} style={styles.colorBlock}>
                      {color}
                    </Text>
                ))}
              </View>
              <Text style={styles.timerText}>A sequência desaparecerá em {timer} segundos...</Text>
            </>
        ) : (
            <>
              <Text style={styles.subHeader}>Escolha a sequência correta:</Text>
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
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  sequenceContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 2,
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
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
  timerText: {
    fontSize: 18,
    marginTop: 10,
  },
  livesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  heart: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  outlinedHeart: {
    fontSize: 30,
    marginHorizontal: 5,
    color: '#ccc', // Cor cinza para coração contornado
  },
});
