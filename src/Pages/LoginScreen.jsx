import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import globalStyles, {colors} from '../Styles/GlobalStyle';
import GoBackButton from '../components/GoBackButton';
import {ScreenNames} from "../enums/ScreenNames";
import StyledInput from "../components/BasesComponents/baseInput";
import StyledButton from "../components/BasesComponents/baseButton";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState();
  const { login, forgetPassword, user } = useAuth();

    const [clicked, setClicked] = useState(false);

    // Função que altera o estado e o valor global
    const handleClick = () => {
        // Inverte o estado do clique
        setClicked(!clicked);

        // Altera o valor global
        global.testServer = !clicked;
    };

  useEffect(() => {
    if (user) {
      navigation.navigate(ScreenNames.DASHBOARD);
    }
  }, [user]);

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigation.navigate(ScreenNames.DASHBOARD);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgetPassword = async () => {
    try {
      await forgetPassword(email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={globalStyles.outerContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>

        <GoBackButton title={"LOGIN"}/>

          <View style={globalStyles.container}>

            <Text style={globalStyles.label}>EMAIL</Text>
            <StyledInput
                variant={'email'}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
            />

            <Text style={globalStyles.label}>SENHA</Text>

            <StyledInput
                variant={'password'}
                filled={true}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
            />

            <TouchableOpacity onPress={handleForgetPassword} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>ESQUECEU A SENHA?</Text>
            </TouchableOpacity>

              <StyledButton
                  title="LOGAR"
                  onPress={() => handleLogin(email, password)}
              />

              {/*<StyledButton*/}
              {/*    title="Login Rápido"*/}
              {/*    onPress={() => handleLogin('12201839@aluno.cotemig.com.br', 'senha123')}*/}
              {/*    loading={false}*/}
              {/*    style={[]}*/}
              {/*    textStyle={[]}*/}
              {/*/>*/}

              {/*<TouchableOpacity*/}
              {/*    onPress={handleClick}*/}
              {/*>*/}
              {/*    <Text>*/}
              {/*        {clicked ? 'Desmarcar Test Server' : 'Marcar Test Server'}*/}
              {/*    </Text>*/}
              {/*</TouchableOpacity>*/}
              {/*<Text>Global.testServer: {global.testServer ? 'True' : 'False'}</Text>*/}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },

  forgotPasswordText: {
    color: colors.BLUE,
    fontSize: 16,
    fontFamily: 'MinhaFonte'
  },
});
