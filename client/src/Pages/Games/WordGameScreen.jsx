import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles, { colors } from '../../Styles/GlobalStyle';
import GoBackButton from '../../components/GoBackButton';
import StyledButton from "../../components/BasesComponents/baseButton";
import gameStyle from '../../Styles/gameStyle';
import Hearts from '../../components/GameComponents/hearts';
import { ScrollView } from 'react-native-gesture-handler';

const palavrasAleatorias = require('../../../assets/palavras-simples.json');

const getMaskedWord = (word) => {
  let maskedWord = word.split('').map((char) => (Math.random() > 0.3 ? char : '_')).join('');
  while (maskedWord === word) {
    maskedWord = word.split('').map((char) => (Math.random() > 0.3 ? char : '_')).join('');
  }
  return maskedWord;
};

const WordGameScreen = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [guess, setGuess] = useState('');
  const [testedLetters, setTestedLetters] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setNewWord();
  }, []);

  const setNewWord = () => {
    const randomIndex = Math.floor(Math.random() * palavrasAleatorias.length);
    const word = palavrasAleatorias[randomIndex];
    setCurrentWord(word);
    setMaskedWord(getMaskedWord(word));
    setAttempts(0);
    setTestedLetters([]);
  };

  const handleGuess = () => {
    if (guess.length !== 1) {
      Alert.alert('Erro', 'Por favor, insira apenas uma letra.');
      return;
    }
    if (testedLetters.includes(guess)) {
      Alert.alert('Erro', 'Você já testou essa letra.');
      setGuess('');
      return;
    }

    setTestedLetters([...testedLetters, guess]);

    const newMaskedWord = currentWord
      .split('')
      .map((char, index) => (maskedWord[index] === '_' && char === guess ? char : maskedWord[index]))
      .join('');

    if (newMaskedWord === maskedWord) {
      setAttempts(attempts + 1);
      if (attempts + 1 >= 3) {
        Alert.alert(
          'Vidas esgotadas!',
          `Todas as vidas foram usadas. A palavra correta era "${currentWord}". O jogo será reiniciado.`,
          [
            {
              text: 'OK',
              onPress: () => {
                setNewWord();
                setScore(0);
              },
            },
          ]
        );
      }
    } else {
      setMaskedWord(newMaskedWord);
      if (newMaskedWord === currentWord) {
        Alert.alert('Parabéns!', `Você ganhou! A palavra era ${currentWord}`);
        setNewWord();
        setScore(score + 100); // Aumenta a pontuação em 100 quando acerta
      }
    }
    setGuess('');
  };

  return (
    <View style={globalStyles.outerContainer}>

      <View style={[globalStyles.scrollContainer, { flexGrow: 0 }]}>
        <GoBackButton title="FORCA" />
      </View>

      <ScrollView contentContainerStyle={[globalStyles.scrollContainer, { paddingTop: 0 }, gameStyle.container]}>

        <View style={gameStyle.header}>
          <Hearts attempts={attempts} />

          <TouchableOpacity 
            onPress={setNewWord} 
            style={gameStyle.refazerButton}
          >
            <Text style={gameStyle.refazerButtonText}>REFAZER</Text>
            <Ionicons name="refresh-outline" size={20} color={colors.PINK} style={gameStyle.icon} />
          </TouchableOpacity>
        </View>

        <Text style={gameStyle.points}>PONTOS: {score}</Text>

        <View style={gameStyle.wordContainer}>
          <Text style={[globalStyles.label, gameStyle.label]}>PALAVRA:</Text>
          <Text style={gameStyle.word}>{maskedWord}</Text>
        </View>

        <TextInput
          style={[globalStyles.input, gameStyle.input]}
          value={guess}
          onChangeText={(text) => setGuess(text.toLowerCase())}
          maxLength={1}
        />

        <StyledButton 
          title="ADIVINHAR" 
          onPress={handleGuess} 
          style={{ marginBottom: 0 }}
        />

        <View style={gameStyle.testedLettersContainer}>
          <Text style={[globalStyles.label, gameStyle.testedLabel]}>LETRAS TESTADAS:</Text>
          <Text style={gameStyle.testedLetters}>{testedLetters.join(' ')}</Text>
        </View>
        
      </ScrollView>
    </View>
  );
};

export default WordGameScreen;
