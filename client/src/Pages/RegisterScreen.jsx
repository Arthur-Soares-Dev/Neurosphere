import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useAuth} from "../contexts/AuthContext";
import {ScreenNames} from "../enums/ScreenNames";
import GoBackButton from '../components/GoBackButton';
import StyledInput from "../components/BasesComponents/baseInput";
import StyledButton from "../components/BasesComponents/baseButton";
import globalStyles, { colors } from '../Styles/GlobalStyle';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    alert(error);
  }, [error]);

  const isNameValid = (name) => {
    return name.length > 0;
  };

  const handleRegister = async (email, password, name) => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      if (email && password && name) {
        await registerUser(email, password, name)
        navigation.navigate(ScreenNames.DASHBOARD);
      } else {
        setError('Preencha todos os campos');
      }
    } catch (error) {
      // setError(error.message);
    }
  };


  const { registerUser } = useAuth();

  return (
    <View style={globalStyles.outerContainer}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
        <View style={globalStyles.container}>

          <GoBackButton title={"CADASTRAR"}/>

          <Text style={globalStyles.label}>USUARIO</Text>
          <View style={globalStyles.input}>
            <TextInput
              style={globalStyles.inputText}
              onChangeText={(name) => setName(name)}
              autoCorrect={false}
              value={name}
            />
            {name.length > 0 && (
              <Ionicons 
                name={isNameValid(name) ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={isNameValid(name) ? colors.BLUE : colors.BLUE} 
                style={styles.inputIcon} 
              />
            )}
          </View>

          <Text style={globalStyles.label}>EMAIL</Text>
            <StyledInput
              variant={'email'}
              filled={true}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
            />

          <Text style={globalStyles.label}>SENHA</Text>
          <StyledInput
              variant={'password'}
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
            />

          <Text style={globalStyles.label}>CONFIRMAR SENHA</Text>
          <StyledInput
              variant={'password'}
              filled={true}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              autoCapitalize="none"
              autoCorrect={false}
              value={confirmPassword}
          />

          <StyledButton
            title="CADASTRAR"
            onPress={() => handleRegister(email, password, name)}
          />
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

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