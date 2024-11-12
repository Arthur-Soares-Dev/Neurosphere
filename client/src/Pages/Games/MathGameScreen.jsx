import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import globalStyles from '../../Styles/GlobalStyle';
import gameStyle from '../../Styles/gameStyle';
import GoBackButton from '../../components/GoBackButton';
import StyledButton from "../../components/BasesComponents/baseButton";
import Hearts from '../../components/GameComponents/hearts';

const MathGameScreen = () => {
  const [number1, setNumber1] = useState(generateNumber());
  const [number2, setNumber2] = useState(generateNumber());
  const [operation, setOperation] = useState(generateOperation());
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Função para gerar número aleatório
  function generateNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  // Função para gerar uma operação aleatória
  function generateOperation() {
    const operations = ["+", "-", "*", "/"];
    return operations[Math.floor(Math.random() * operations.length)];
  }

  // Função para calcular o resultado
  const calculateResult = () => {
    switch (operation) {
      case '+':
        return number1 + number2;
      case '-':
        return number1 - number2;
      case '*':
        return number1 * number2;
      case '/':
        return number1 / number2;
      default:
        return 0;
    }
  };

  // Verificar a resposta do usuário
  const checkAnswer = () => {
    const correctAnswer = calculateResult();
    if (parseFloat(userAnswer) === parseFloat(correctAnswer)) {
      Alert.alert("Parabéns!", "Você acertou!");
      resetGame();
    } else {
      setAttempts(prev => prev + 1);
      if (attempts + 1 >= 3) {
        Alert.alert("Vidas esgotadas!", "O jogo será reiniciado.");
        resetGame(true);
      } else {
        Alert.alert("Errado!", `A resposta correta é ${correctAnswer}.`);
      }
    }
  };

  // Função para reiniciar o jogo
  const resetGame = (resetAttempts = false) => {
    let num1 = generateNumber();
    let num2 = generateNumber();
    let op = generateOperation();

    // Garante divisões inteiras
    while (op === '/' && num1 % num2 !== 0) {
      num1 = generateNumber();
      num2 = generateNumber();
    }

    setNumber1(num1);
    setNumber2(num2);
    setOperation(op);
    setUserAnswer("");
    if (resetAttempts) setAttempts(0); // Reinicia as vidas se o jogo for reiniciado após 3 erros
  };

  return (
    <View style={globalStyles.outerContainer}>
      <View style={[globalStyles.scrollContainer, gameStyle.container]}>
        <GoBackButton title="CONTINHAS" />

        {/* Exibir os corações */}
        <Hearts attempts={attempts} />

        <View style={gameStyle.wordContainer}>
          <Text style={[globalStyles.label, gameStyle.label]}>CONTA:</Text>
          <Text style={gameStyle.word}>{number1} {operation} {number2}</Text>
        </View>

        <TextInput
          style={[globalStyles.input, gameStyle.input]}
          value={userAnswer}
          onChangeText={setUserAnswer}
          keyboardType="numeric"
        />
        <Button title="Novo Jogo" onPress={() => resetGame(true)} />
        
        <StyledButton 
          title="VERIFICAR" 
          onPress={checkAnswer} 
          style={{ marginBottom: 0 }}
        />
      </View>
    </View>
  );
};

export default MathGameScreen;
