import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useAuth} from "./contexts/AuthContext";

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setProfileImage(user.profileImage)
  }, []);

  const isNameValid = (name) => {
    return name.length > 0;
  };

  const validateEmail = (email) => {
    // Expressão para validação de email - Stack Overflow e Linkedin
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      setProfileImage(source);

      await handleUpdate()
    }
  };

  const handleUpdate = async () => {
    if (!user) {
      console.error('Usuário não está autenticado ou o UID está faltando');
      return;
    }

    const updatedData = {
      name: name,
      email: email
    };

    try {
      // const profileImage = profileImage ? profileImage : null;
      console.log('profileImage',profileImage)

      console.log('UID', user.uid);
      await updateUser(user.uid, updatedData, currentPassword, newPassword, profileImage);
      console.log("Atualização de usuário concluída com sucesso!");
      alert("Atualização de usuário concluída com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar o usuário:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout;
      navigation.navigate('Login');
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    }
  }

  const { updateUser, user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FD7FAC" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/default-avatar.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome"
          />
          {name.trim() !== '' && (
            <Ionicons
              name={isNameValid(name) ? "checkmark-circle" : "close-circle"} 
              size={24} 
              color={isNameValid(name) ? "gray" : "gray"} 
              style={styles.icon}
            />
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          {email.trim() !== '' && (
            <Ionicons
              name={validateEmail(email) ? "checkmark-circle" : "close-circle"} 
              size={24} 
              color={validateEmail(email) ? "gray" : "gray"} 
              style={styles.icon}
            />
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha Atual</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Senha Atual"
            secureTextEntry={!showCurrentPassword}
          />
          <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <Ionicons name={showCurrentPassword ? "eye" : "eye-off"} size={24} color="gray" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha Nova</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Senha Nova"
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={24} color="gray" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => {
            navigation.navigate("FeedbackList")
          }}
      >
        <Text style={styles.buttonText}>Feedbacks</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FD7FAC', marginTop: 20 }]}
        onPress={() => {
          handleLogout()
        }}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    marginTop: 10,
  },
  avatar: {
    width: 120, 
    height: 120, 
    borderRadius: 60,
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24, 
  },
  label: {
    marginBottom: 8,
    color: '#FD7FAC',
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#7C9DD9',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});