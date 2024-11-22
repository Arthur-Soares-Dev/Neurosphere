import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import globalStyles, { colors, sizeFonts } from '../../Styles/GlobalStyle';
import DashGif from '../../../assets/DashGif.gif';
import DashStatic from '../../../assets/DashStatic.png';

const Card = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Começa reproduzindo o GIF automaticamente
  const [isDisabled, setIsDisabled] = useState(true); // Desabilita o botão enquanto o GIF está ativo

  const gifDuration = 4350; // Duração do GIF em milissegundos

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(false); // Troca para a imagem estática após o GIF terminar
      setIsDisabled(false); // Habilita o botão
    }, gifDuration);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  const restartGif = () => {
    setIsPlaying(true); // Reinicia o GIF ao clicar
    setIsDisabled(true); // Desabilita o botão enquanto o GIF está ativo
    setTimeout(() => {
      setIsPlaying(false); // Troca para a imagem estática após o GIF terminar
      setIsDisabled(false); // Habilita o botão
    }, gifDuration);
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.menuContainer}>
        <Text
          style={{
            fontSize: sizeFonts.MEDIUM,
            color: colors.YELLOW,
            fontFamily: 'MinhaFonte',
          }}
        >
          INÍCIO
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.gifButton, isDisabled && styles.disabledButton]}
        onPress={restartGif}
        disabled={isDisabled} // Desabilita o botão enquanto o GIF está ativo
      >
        {isPlaying ? (
          <Image source={DashGif} style={styles.gif} /> // Exibe o GIF enquanto reproduz
        ) : (
          <Image source={DashStatic} style={styles.gif} /> // Exibe a imagem estática após o GIF
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  card: {
    height: 200,
    backgroundColor: '#E3E3E3',
    marginBottom: 17,
    borderRadius: 10,
  },

  gifButton: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
  },

  disabledButton: {
    opacity: 1, // Adiciona um efeito visual para indicar que o botão está desabilitado
  },

  gif: {
    height: '170%',
    width: '100%',
    resizeMode: 'contain',
  },
});
