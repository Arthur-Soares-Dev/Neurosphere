import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../contexts/AuthContext";
import StyledButton from "../components/BasesComponents/baseButton";
import globalStyles from "../Styles/GlobalStyle";
import StyledInput from "../components/BasesComponents/baseInput";
import GoBackButton from '../components/GoBackButton';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const { updateUser, user, checkCurrentPassword } = useAuth();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setProfileImage(user.profileImage);
  }, []);

  const handleUpdate = async () => {
    if (!currentPassword) {
      Alert.alert('Erro', 'Por favor, insira a senha atual.');
      return;
    }

    // const isPasswordCorrect = await checkCurrentPassword(currentPassword);
    // if (!isPasswordCorrect) {
    //   Alert.alert('Erro', 'A senha atual está incorreta.');
    //   return;
    // }

    const updatedData = {
      name: name || undefined,
      email: email || undefined,
      newPassword: newPassword || undefined,
      profileImage: profileImage || undefined
    };

    try {
      await updateUser(user.uid, updatedData);
      Alert.alert("Sucesso", "Atualização de usuário concluída com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar o usuário: " + error.message);
    }
  };

  return (
    <View style={globalStyles.outerContainer}>

      <View style={[globalStyles.scrollContainer, { flexGrow: 0}]}>
        <GoBackButton title="EDITAR PERFIL" />
      </View>

      <ScrollView contentContainerStyle={[globalStyles.scrollContainer,  { paddingTop: "0%"}]}>

        <View style={[globalStyles.container, { alignItems: 'center', justifyContent: 'flex-start' }]}>
          

          <Text style={globalStyles.label}>Nome</Text>
          <StyledInput 
            variant="text" 
            onChangeText={setName} 
            value={name} 
            autoCapitalize="words" 
          />

          <Text style={globalStyles.label}>Email</Text>
          <StyledInput 
            variant="email" 
            onChangeText={setEmail} 
            value={email} 
            autoCapitalize="none" 
            keyboardType="email-address" 
          />

          <Text style={globalStyles.label}>Senha Atual</Text>
          <StyledInput 
            variant="password" 
            onChangeText={setCurrentPassword}
            value={currentPassword}
            autoCapitalize="none" 
          />

          <Text style={globalStyles.label}>Senha Nova</Text>
          <StyledInput 
            variant="password" 
            onChangeText={setNewPassword} 
            value={newPassword} 
            autoCapitalize="none" 
          />

          <StyledButton 
            title="Atualizar" 
            onPress={handleUpdate} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
