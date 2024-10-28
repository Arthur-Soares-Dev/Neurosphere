import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import globalStyles from '../../Styles/GlobalStyle';

const SocialLoginButtons = ({...props}) => {
  return (
    <TouchableOpacity
    onPress={() => handleLogin(email, password)}
    style={globalStyles.button}
    >
        <Text style={globalStyles.buttonText}>Logar</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({

});
