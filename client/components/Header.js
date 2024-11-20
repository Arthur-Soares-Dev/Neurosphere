import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Header = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {name}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#026efd', // Cor rosa
  },
});
