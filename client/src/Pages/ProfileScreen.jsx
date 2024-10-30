import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useAuth} from "../contexts/AuthContext";
import {ScreenNames} from "../enums/ScreenNames";
import StyledButton from "../components/BasesComponents/baseButton";
import {colors} from "../Styles/GlobalStyle";
import StyledInput from "../components/BasesComponents/baseInput";

const ProfileScreen = () => {
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
      const source = {uri: result.assets[0].uri};
      setProfileImage(source);

      await handleUpdate()
    }
  };

  const handleUpdate = async () => {
    if (!user || !user.uid) {
      console.error('Usuário não está autenticado ou o UID está faltando');
      return;
    }

    const updatedData = {
      name: name || undefined,
      email: email || undefined,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
      profileImage: profileImage || undefined
    };

    try {
      console.log('UID', user.uid);
      await updateUser(user.uid, updatedData);
      console.log("Atualização de usuário concluída com sucesso!");
      alert("Atualização de usuário concluída com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      alert("Erro ao atualizar o usuário: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      logout().then(() => {
        navigation.navigate(ScreenNames.LOGIN);
      });
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    }
  }

  const {updateUser, user, logout} = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FD7FAC"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={profileImage ? {uri: profileImage} : require('../../assets/default-avatar.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
          <StyledInput
            value={name}
            onChangeText={setName}
            placeholder="Nome"
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
          <StyledInput
            variant={'email'}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha Atual</Text>
          <StyledInput
            variant={'password'}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Senha Atual"
            // secureTextEntry={!showCurrentPassword}
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha Nova</Text>
          <StyledInput
            variant={'password'}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Senha Nova"
            // secureTextEntry={!showNewPassword}
          />
      </View>

        <StyledButton
            title="Atualizar"
            onPress={handleUpdate}
        />

        <StyledButton
            title="Feedbacks"
            onPress={() => navigation.navigate(ScreenNames.FEEDBACK_LIST)}
            blueBackground={true}
        />

        <StyledButton
            title="Sair"
            onPress={handleLogout}
            style={{backgroundColor: colors.PURPLE}}
        />

    </View>
  );
};

export default ProfileScreen;

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
    // marginBottom: 24,
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