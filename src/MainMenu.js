import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NeuroSphereScreen = () => {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('Cadastro');
  };

  const handleSignInWithGoogle = () => {
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./Asset/Layer_1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={handleSignIn}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line}></View>
      <TouchableOpacity
        style={[styles.button, styles.blueButton]}
        onPress={handleSignInWithGoogle}
      >
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: '75%',
    height: 150, // Altura fixa
    alignSelf: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingHorizontal: 10, // espaçamento interno
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%', // espaçamento interno
    marginBottom: 10,
  },
  blueButton: {
    backgroundColor: '#026efd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#026efd',
    marginBottom: 20,
  },
});

export default NeuroSphereScreen;
