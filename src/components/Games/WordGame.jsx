import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const palavrasAleatorias = require('../../../assets/palavras-simples.json');

const getMaskedWord = (word) => {
  Math.max(1, Math.floor(word.length * 0.3));
  let maskedWord = word.split('').map((char) => (Math.random() > 0.3 ? char : '_')).join('');

  while (maskedWord === word) {
    maskedWord = word.split('').map((char) => (Math.random() > 0.3 ? char : '_')).join('');
  }

  return maskedWord;
};

const WordGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 5;

  useEffect(() => {
    setNewWord();
  }, []);

  const setNewWord = () => {
    const randomIndex = Math.floor(Math.random() * palavrasAleatorias.length);
    const word = palavrasAleatorias[randomIndex];
    setCurrentWord(word);
    setMaskedWord(getMaskedWord(word));
    setAttempts(0)
    setMessage('Digite uma letra!')
    renderHearts()
    console.log('Palavra selecionada:', word); // Log da palavra correta
  };

  const handleGuess = () => {
    if (guess.length !== 1) {
      setMessage('Por favor, insira apenas uma letra.');
      return;
    }

    const newMaskedWord = currentWord
      .split('')
      .map((char, index) => (maskedWord[index] === '_' && char === guess ? char : maskedWord[index]))
      .join('');

    if (newMaskedWord === maskedWord) {
      setAttempts(attempts + 1);
      if (attempts + 1 >= maxAttempts) {
        setMessage('Você perdeu! A palavra era ' + currentWord);
        setMaskedWord(currentWord);
        console.log('Você perdeu. Palavra correta:', currentWord);
        Alert.alert('Você perdeu!', `A palavra era ${currentWord}`);
      } else {
        setMessage('Letra incorreta!');
      }
    } else {
      setMaskedWord(newMaskedWord);
      if (newMaskedWord === currentWord) {
        setMessage('Você ganhou! A palavra era ' + currentWord);
        console.log('Você ganhou. Palavra correta:', currentWord);
        Alert.alert('Você ganhou!', `A palavra era ${currentWord}`);
        setNewWord()
      } else {
        setMessage('Letra correta!');
      }
    }

    setGuess('');
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < maxAttempts; i++) {
      hearts.push(
        <Ionicons 
          key={i}
          name="heart" 
          size={40} 
          color={i < maxAttempts - attempts ? 'red' : 'grey'} />
      );
    }
  
    return <View style={styles.heartsContainer}>{hearts}</View>;
  };


  return (
    <View style={styles.container}>
      { renderHearts() }
      <Text style={styles.title}>Jogo da Forca</Text>
      <Text style={styles.word}>
        {maskedWord}
      </Text>
      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={(text) => setGuess(text.toLowerCase())}
        maxLength={1}
        placeholder="Digite uma letra"
      />
      <Button title="Adivinhar" onPress={handleGuess} />
      <Text style={styles.message}>
        {message}
      </Text>
      <Button title="Nova Palavra" onPress={() => setNewWord()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  word: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    fontSize: 24,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
    width: '50%',
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: 'red',
    marginVertical: 20,
  },
  heartsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 100,
    right: 20
  }
});

export default WordGame;
