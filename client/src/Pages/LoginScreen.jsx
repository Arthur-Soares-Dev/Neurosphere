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
                value={password}
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

              <StyledButton
                  title="LOGAR"
                  onPress={() => handleLogin(email, password)}
              />

              <StyledButton
                  title="Login Rápido"
                  onPress={() => handleLogin('12201839@aluno.cotemig.com.br', 'senha123')}
                  loading={false}
                  style={[]}
                  textStyle={[]}
              />

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
