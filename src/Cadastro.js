import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import StyleBotao from './components/Styles/botao';
import StyleInput from './components/Styles/input';

const Cadastro = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async (email, password, firstName, lastName) => {
    try {
      if (email && password && firstName && lastName) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              firstName,
              lastName,
              email
            })
              .then(() => {
                alert('Cadastro realizado com sucesso!');
                navigation.navigate('Login');
              })
              .catch((error) => {
                alert(error.message);
              })
          })
          .catch((error) => {
            alert(error.message);
          })
      } else {
        alert('Por favor, preencha todos os campos');
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.outerContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff', marginTop: 20 }}>Voltar</Text>
        </TouchableOpacity>

          <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Olá!</Text>
              <Text style={styles.subHeaderText}>Cadastrar</Text>
          </View>
          <View style={styles.container}>
              <View style={styles.innerContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={StyleInput.inputTitle}>Nome</Text>
                      <View style={StyleInput.inputWrapper}>
                        <TextInput
                            style={StyleInput.textInput}
                            placeholder='Primeiro nome'
                            placeholderTextColor="rgba(53,53,53,.6)"
                            onChangeText={(firstName) => setFirstName(firstName)}
                            autoCorrect={false}
                        />
                      </View>

                    <Text style={StyleInput.inputTitle}>Sobrenome</Text>
                    <View style={StyleInput.inputWrapper}>
                      <TextInput
                        style={StyleInput.textInput}
                        placeholder='Sobrenome'
                        placeholderTextColor="rgba(53,53,53,.6)"
                        onChangeText={(lastName) => setLastName(lastName)}
                        autoCorrect={false}
                      />
                    </View>

                    <Text style={StyleInput.inputTitle}>Email</Text>
                    <View style={StyleInput.inputWrapper}>
                        <TextInput
                            style={StyleInput.textInput}
                            placeholder="Email"
                            placeholderTextColor="rgba(53,53,53,.6)"
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                        />
                    </View>
              
                    <Text style={StyleInput.inputTitle}>Senha</Text>
                    <View style={StyleInput.inputWrapper}>
                        <TextInput
                            style={StyleInput.textInput}
                            placeholder="Senha"
                            placeholderTextColor="rgba(53,53,53,.6)"
                            onChangeText={(password) => setPassword(password)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={password}
                        />
                    </View> 
                  </View>

                  <TouchableOpacity
                    onPress={() => registerUser(email, password, firstName, lastName)}
                    style={StyleBotao.button}
                    >
                    <Text style={StyleBotao.buttonText}>Cadastrar</Text>
                  </TouchableOpacity>

                  <View style={styles.separatorContainer}>
                      <View style={styles.separator} />
                      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                          <Text style={styles.separatorText}>Já possui uma conta?</Text>
                      </TouchableOpacity>
                      <View style={styles.separator} />
                  </View>

                  <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signInLinkContainer}>
                      <Text style={styles.signInLinkText}>Logar</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ff5e78',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  scrollContainer: {
      flexGrow: 1,
  },
  headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
  },
  headerText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
  },
  subHeaderText: {
      fontSize: 24,
      color: '#fff',
      marginBottom: 30,
  },
  container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 50,
  },
  inputContainer: {
      width: '100%',
      marginBottom: 20,
  },
  forgotPasswordContainer: {
      alignSelf: 'flex-end',
      marginBottom: 20,
  },
  forgotPasswordText: {
      color: '#999',
      fontSize: 14,
  },
  separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      width: '100%',
      justifyContent: 'center',
  },
  separator: {
      height: 1,
      backgroundColor: '#353535',
      flex: 1,
  },
  separatorText: {
      marginHorizontal: 10,
      color: '#353535',
      fontSize: 16,
      fontWeight: 'bold',
  },
  signInLinkContainer: {
      marginTop: 10,
  },
  signInLinkText: {
      color: '#FD7FAC',
      fontSize: 16,
      fontWeight: 'bold',
  },
})

export default Cadastro;
