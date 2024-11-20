import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, sizeFonts } from '../../Styles/GlobalStyle';

const GoBackButton = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={colors.YELLOW} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.line} />
    </View>
  );
};

export default GoBackButton;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: sizeFonts.MEDIUM,
    marginLeft: 10,
    color: colors.YELLOW,
    fontFamily: 'MinhaFonte'
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: colors.YELLOW,
    marginTop: 15,
  },
});
