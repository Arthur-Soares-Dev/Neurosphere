import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const MathGame = () => {
  const [number1, setNumber1] = useState(generateNumber());
  const [number2, setNumber2] = useState(generateNumber());
  const [operation, setOperation] = useState(generateOperation());
  const [userAnswer, setUserAnswer] = useState("");

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
    } else {
      Alert.alert("Errado!", `A resposta correta é ${correctAnswer}.`);
    }
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Matemática</Text>
      <Text style={styles.question}>Qual é o resultado de: {number1} {operation} {number2}?</Text>
      <TextInput
        style={styles.input}
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Digite sua resposta"
        keyboardType="numeric"
      />
      <Button title="Verificar" onPress={checkAnswer} />
      <Button title="Novo Jogo" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default MathGame;
