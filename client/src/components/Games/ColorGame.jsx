import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Cores disponíveis
const colors = ['🔴', '🟢', '🔵', '🟡', '🟣'];

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

  const [correctSequence, setCorrectSequence] = useState(getRandomSequence());
  const [options, setOptions] = useState(getRandomSequences(correctSequence));
  const [showSequence, setShowSequence] = useState(true);  // Controle para mostrar a sequência
  const [timer, setTimer] = useState(3);  // Temporizador de 3 segundos

  useEffect(() => {
    if (timer > 0 && showSequence) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown); // Limpa o temporizador quando o componente é desmontado ou reinicia
    } else if (timer === 0 && showSequence) {
      setShowSequence(false); // Esconde a sequência após o timer acabar
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
        setShowSequence(true);  // Mostrar sequência novamente para a nova rodada
        setTimer(3);  // Reiniciar o temporizador
      }
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setRound(1);
    setGameOver(false);
    setSuccess(false);
    const newCorrectSequence = getRandomSequence();
    setCorrectSequence(newCorrectSequence);
    setOptions(getRandomSequences(newCorrectSequence));
    setShowSequence(true);  // Mostrar sequência ao reiniciar
    setTimer(3);  // Reiniciar o temporizador
  };

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOverText}>
          {success ? 'Parabéns, você ganhou!' : 'Você errou!'}
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

      {showSequence ? (
        <>
          <Text style={styles.subHeader}>Memorize a sequência de cores:</Text>
          <View style={styles.sequenceContainer}>
            {correctSequence.map((color, index) => (
              <Text key={index} style={styles.colorBlock}>{color}</Text>
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
                onPress={() => handleOptionPress(sequence)}
              >
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
  timerText: {
    fontSize: 18,
    marginTop: 10,
  },
});
