import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useAuth} from '../contexts/AuthContext';
import globalStyles from '../Styles/GlobalStyle';
import SocialLoginButtons from '../components/SocialLoginButtons';
import {ScreenNames} from "../enums/ScreenNames";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState();
  const {login, forgetPassword, user} = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate(ScreenNames.DASHBOARD); // Se o usuário estiver logado, navega para o DashboardScreen
    }
  }, [user]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async (email, password) => {
    console.log('handleLogin', email, password)
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
    <SafeAreaView style={globalStyles.outercontainer}>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={globalStyles.container}>
          
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

          <View style={globalStyles.input}>
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

          <TouchableOpacity onPress={handleForgetPassword} style={styles.forgotPasswordContainer}>

            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>

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

          <SocialLoginButtons/>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Não possui uma conta?</Text>

            <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.REGISTER)}>

              <Text style={styles.signUpLink}>Cadastrar</Text>

            </TouchableOpacity>
          </View>

        </View>    
      </KeyboardAvoidingView>
    </SafeAreaView>
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({


  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E0E0E0',
    marginBottom: 40,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#FD7FAC',
    fontSize: 18,
    marginBottom: 10,
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
    fontSize: 18,
    paddingVertical: 15,
  },
  inputIcon: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  forgotPasswordText: {
    color: '#999',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#7C9DD9',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 15,
    paddingRight: 83,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
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
