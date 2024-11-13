import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../Styles/GlobalStyle';
import gameStyle from '../../Styles/gameStyle';

const Hearts = ({ attempts }) => {
  const totalLives = 3;

  return (
    <View style={gameStyle.heartsContainer}>
      {Array.from({ length: totalLives }, (_, i) => (
        <Ionicons
          key={i}
          name="heart"
          size={35}
          color={i < totalLives - attempts ? colors.BLUE : colors.GRAY}
          style={gameStyle.heartIcon}
        />
      ))}
    </View>
  );
};

export default Hearts;
