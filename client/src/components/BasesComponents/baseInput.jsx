import { StyleSheet, View } from 'react-native';
import React from 'react';
import globalStyles from '../../Styles/GlobalStyle';

const SocialLoginButtons = ({...props}) => {
  return (
    <View style={globalStyles.input}>
    <TextInput
      style={globalStyles.inputText}
      onChangeText={(email) => setEmail(email)}
      autoCapitalize="none"
      autoCorrect={false}
      value={email}
    />
  </View>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({

});
