import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import globalStyles, {colors} from '../Styles/GlobalStyle';
import SocialLoginButtons from '../components/SocialLoginButtons';
import GoBackButton from '../components/GoBackButton';
import {ScreenNames} from "../enums/ScreenNames";
import StyledInput from "../components/BasesComponents/baseInput";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState();
  const { login, forgetPassword, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate(ScreenNames.DASHBOARD);
    }
  }, [user]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

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
      alert("Email para troca de senha enviado");
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


            {/*<View style={globalStyles.input}>*/}
              {/*<TextInput*/}
              {/*  style={globalStyles.inputText}*/}
              {/*  onChangeText={(email) => setEmail(email)}*/}
              {/*  autoCapitalize="none"*/}
              {/*  autoCorrect={false}*/}
              {/*  value={email}*/}
              {/*/>*/}

              {/*{email.length > 0 && (*/}
              {/*  <Ionicons*/}
              {/*    name={validateEmail(email) ? "checkmark-circle" : "close-circle"}*/}
              {/*    size={24}*/}
              {/*    color={validateEmail(email) ? colors.BLUE : colors.BLUE}*/}
              {/*    style={styles.inputIcon}*/}
              {/*  />*/}
              {/*)}*/}
            {/*</View>*/}

            <Text style={globalStyles.label}>SENHA</Text>

            <StyledInput
                variant={'password'}
                filled={true}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={false}
                // secureTextEntry={!showPassword}
                value={password}
                // setShowPassword={setShowPassword}
                // showPassword={showPassword}
            />

            {/*<View style={[globalStyles.input, globalStyles.filledInput]}>*/}
            {/*  <TextInput*/}
            {/*    style={[globalStyles.inputText, globalStyles.filledInputText]}*/}
            {/*    onChangeText={(password) => setPassword(password)}*/}
            {/*    autoCapitalize="none"*/}
            {/*    autoCorrect={false}*/}
            {/*    secureTextEntry={!showPassword}*/}
            {/*    value={password}*/}
            {/*  />*/}
            {/*  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>*/}
            {/*    <Ionicons*/}
            {/*      name={showPassword ? "eye" : "eye-off"}*/}
            {/*      size={24}*/}
            {/*      color={colors.WHITE}*/}
            {/*      style={styles.inputIcon}*/}
            {/*    />*/}
            {/*  </TouchableOpacity>*/}
            {/*</View>*/}

            <TouchableOpacity onPress={handleForgetPassword} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>ESQUECEU A SENHA?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleLogin(email, password)}
              style={globalStyles.button}
            >
              <Text style={globalStyles.buttonText}>Logar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleLogin('12201839@aluno.cotemig.com.br', 'senha123')}
              style={globalStyles.button}
            >
              <Text style={globalStyles.buttonText}>Login Rápido</Text>
            </TouchableOpacity>

            <SocialLoginButtons />

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Não possui uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.REGISTER)}>
                <Text style={styles.signUpLink}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  inputIcon: {
    marginLeft: 10,
  },

  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },

  forgotPasswordText: {
    color: colors.BLUE,
    fontSize: 16,
    fontFamily: 'MinhaFonte'
  },

  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpText: {
    color: '#353535',
    fontSize: 16,
  },
  signUpLink: {
    color: '#FD7FAC',
    fontSize: 16,
    marginLeft: 5,
  }
});
