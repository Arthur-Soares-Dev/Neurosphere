import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import globalStyles, {colors, sizeFonts} from '../../Styles/GlobalStyle';
import DashGif from '../../../assets/DashGif.gif';

const Card = () => {
  const [restartKey, setRestartKey] = useState(0);

  const gifDuration = 4350; // Duração do GIF em milissegundos (ajuste conforme necessário)

  const restartGif = () => {
    // Atualiza a chave para recriar o componente Image
    setRestartKey((prevKey) => prevKey + 1);

    // Opcional: Para manter a consistência visual, podemos esperar o término da reprodução.
    setTimeout(() => {
      // Aqui você pode adicionar lógica adicional, se necessário
    }, gifDuration);
  };

  return (
    <View style={{width: "100%"}}>
      <View style={styles.menuContainer}>
        <Text style={{fontSize: sizeFonts.MEDIUM, color: colors.YELLOW, fontFamily: 'MinhaFonte',}}>
          INÍCIO (clique no card abaixo)
        </Text>
      </View>
      <TouchableOpacity style={styles.gifButton} onPress={restartGif}>
        <Image
          key={restartKey} // Força a recriação do componente para reiniciar o GIF
          source={DashGif}
          style={styles.gif}
        />
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.BLUE,
    marginBottom: 17,
    paddingTop: 25,
  },

  gif: {
    height: '170%',
    width: '100%',
    resizeMode: 'contain',
  },
});
