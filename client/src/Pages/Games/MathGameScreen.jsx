import React, { useState } from 'react';
import { Alert, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles, { colors } from '../../Styles/GlobalStyle';
import gameStyle from '../../Styles/gameStyle';
import GoBackButton from '../../components/GoBackButton';
import StyledButton from "../../components/BasesComponents/baseButton";
import Hearts from '../../components/GameComponents/hearts';

// Função para gerar número aleatório
function generateNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

// Função para gerar uma operação aleatória sem modificar o estado diretamente
function generateOperation(num1, num2) {
  const operations = ["+", "-", "*", "/"];
  let op = operations[Math.floor(Math.random() * operations.length)];

  // Garante que subtrações e divisões não resultem em números negativos ou quebrados
  if (op === '-' && num1 < num2) {
    [num1, num2] = [num2, num1];
  } else if (op === '/' && (num1 % num2 !== 0 || num1 < num2)) {
    num1 = num1 * num2;  // Ajusta para uma divisão inteira e positiva
  }

  return { num1, num2, op };
}

const MathGameScreen = () => {
  // Estado inicial gerado uma vez
  const initialNumbersAndOperation = generateOperation(generateNumber(), generateNumber());
  const [number1, setNumber1] = useState(initialNumbersAndOperation.num1);
  const [number2, setNumber2] = useState(initialNumbersAndOperation.num2);
  const [operation, setOperation] = useState(initialNumbersAndOperation.op);
  const [userAnswer, setUserAnswer] = useState("");
  const [testedAnswers, setTestedAnswers] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

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
    // Verifica se o campo de resposta está vazio
    if (userAnswer.trim() === "") {
      Alert.alert("Alerta", "Por favor, digite uma resposta.");
      return; // Sai da função se o campo estiver vazio
    }

    const correctAnswer = calculateResult();
    if (parseFloat(userAnswer) === parseFloat(correctAnswer)) {
      Alert.alert("Parabéns!", "Você acertou!");
      setScore(score + 100);
      resetGame();
    } else {
      setAttempts(prev => prev + 1);
      setTestedAnswers(prev => [...prev, userAnswer]); // Adiciona a resposta incorreta ao array de respostas testadas
      if (attempts + 1 >= 3) {
        Alert.alert("Vidas esgotadas!", `A resposta correta é ${correctAnswer}. O jogo será reiniciado.`);
        setScore(0);
        resetGame(true);
      } else {
        Alert.alert("Errado!", `Tente outra vez.`);
      }
    }
  };


  // Função para reiniciar o jogo
  const resetGame = (resetAttempts = false) => {
    const { num1, num2, op } = generateOperation(generateNumber(), generateNumber());

    setNumber1(num1);
    setNumber2(num2);
    setOperation(op);
    setUserAnswer("");
    setTestedAnswers([]); // Limpa as respostas testadas ao reiniciar o jogo
    if (resetAttempts) setAttempts(0);
  };

  return (
    <View style={globalStyles.outerContainer}>

      <View style={[globalStyles.scrollContainer, { flexGrow: 0 }]}>
        <GoBackButton title="CONTINHAS" />
      </View>

      <ScrollView contentContainerStyle={[globalStyles.scrollContainer, { paddingTop: 0 }, gameStyle.container]}>

        <View style={gameStyle.header}>
          <Hearts attempts={attempts} />

          <TouchableOpacity 
            onPress={() => resetGame(true)} 
            style={gameStyle.refazerButton}
          >
            <Text style={gameStyle.refazerButtonText}>REFAZER</Text>
            <Ionicons name="refresh-outline" size={20} color={colors.PINK} style={gameStyle.icon} />
          </TouchableOpacity>
        </View>

        <Text style={gameStyle.points}>PONTOS: {score}</Text>

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
        
        <StyledButton 
          title="VERIFICAR" 
          onPress={checkAnswer} 
          style={{ marginBottom: 0 }}
        />

        <View style={gameStyle.testedLettersContainer}>
          <Text style={[globalStyles.label, gameStyle.testedLabel]}>RESPOSTAS TESTADAS:</Text>
          <Text style={gameStyle.testedLetters}>{testedAnswers.join(' ')}</Text>
        </View>

      </ScrollView>

    </View>
  );
};

export default MathGameScreen;
