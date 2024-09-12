import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebase } from '../config';

const Cadastro = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const validateEmail = (email) => {
    // Expressão para validação de email - Stack Overflow e Linkedin
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isNameValid = (name) => {
    return name.length > 0;
  };

  const registerUser = async (email, password, name) => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      if (email && password && name) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              name,
              email
            })
              .then(() => {
                alert('Cadastro realizado com sucesso!');
                navigation.navigate('Login');
              })
              .catch((error) => {
                alert(error.message);
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert('Por favor, preencha todos os campos');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.outerContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.profilePlaceholder} />

          <Text style={styles.label}>Nome</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Nome"
              placeholderTextColor="rgba(53,53,53,.6)"
              onChangeText={(name) => setName(name)}
              autoCorrect={false}
              value={name}
            />
            {name.length > 0 && (
              <Ionicons 
                name={isNameValid(name) ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={isNameValid(name) ? "gray" : "gray"} 
                style={styles.inputIcon} 
              />
            )}
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="rgba(53,53,53,.6)"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
            />
            {email.length > 0 && (
              <Ionicons 
                name={validateEmail(email) ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={validateEmail(email) ? "gray" : "gray"} 
                style={styles.inputIcon} 
              />
            )}
          </View>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              placeholderTextColor="rgba(53,53,53,.6)"
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye" : "eye-off"} 
                size={24} 
                color="gray" 
                style={styles.inputIcon} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Confirmar Senha"
              placeholderTextColor="rgba(53,53,53,.6)"
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons 
                name={showConfirmPassword ? "eye" : "eye-off"} 
                size={24} 
                color="gray" 
                style={styles.inputIcon} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => registerUser(email, password, name)}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          </TouchableOpacity>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={30} color="#FD7FAC" />
              <Text style={styles.signInText}> Cadastrar com o <Text style={styles.signInLink}>Google</Text>?</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={30} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={30} color="#7C9DD9" />
            </TouchableOpacity> */}
          </View>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Já possui uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Logar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 30,
  },
  container: {
    flex: 1,
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 30,
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E0E0E0',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#FD7FAC',
    fontSize: 16,
    marginBottom: 5,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#7C9DD9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 15,
    paddingRight: 70, 
    borderRadius: 12,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInText: {
    color: '#353535',
    fontSize: 16,
  },
  signInLink: {
    color: '#FD7FAC',
    fontSize: 16,
    marginLeft: 5,
  },
});