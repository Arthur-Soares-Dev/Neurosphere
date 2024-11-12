import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "../contexts/AuthContext";
import { ScreenNames } from "../enums/ScreenNames";
import StyledButton from "../components/BasesComponents/baseButton";
import GoBackButton from '../components/GoBackButton';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';
import api from '../service/api'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout, updateUserProfileImage } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.profileImage || ''); // Usando o encadeamento opcional

  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
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
      const source = result.assets[0].uri;
      setProfileImage(source);

      try {
        const fileExtension = source.split('.').pop().toLowerCase(); // Detecta a extensão do arquivo
        let mimeType;

        // Determina o tipo MIME baseado na extensão do arquivo
        switch (fileExtension) {
          case 'jpg':
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'gif':
            mimeType = 'image/gif';
            break;
          case 'bmp':
            mimeType = 'image/bmp';
            break;
          case 'webp':
            mimeType = 'image/webp';
            break;
          default:
            mimeType = 'image/*'; // Para garantir que qualquer imagem seja aceita
        }

        const formData = new FormData();
        formData.append('image', {
          uri: source,
          name: `profile_image.${fileExtension}`,
          type: mimeType,
        });

        await updateUserProfileImage(formData);

        Alert.alert('Sucesso', 'Imagem de perfil atualizada com sucesso.');
      } catch (error) {
        console.error('Erro ao atualizar imagem de perfil:', error);
        Alert.alert('Erro', 'Não foi possível atualizar a imagem de perfil.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate(ScreenNames.LANDING);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
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
      <ScrollView contentContainerStyle={[globalStyles.scrollContainer]}>
        <View style={[globalStyles.container, { alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
          <GoBackButton title="MEU PERFIL" />

          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleImagePick}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../../assets/default-avatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              {user ? (
                <>
                  <Text style={[globalStyles.tittle, { marginBottom: 5 }]}>{user.name}</Text>
                  <Text style={{ color: colors.BLUE, fontSize: sizeFonts.SMALL }}>{user.email}</Text>
                </>
              ) : (
                <Text style={{ color: colors.RED }}>Usuário não encontrado</Text>
              )}
              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={() => navigation.navigate(ScreenNames.EDIT_PROFILE)}
              >
                <Text style={styles.buttonText}>Editar Perfil</Text>
                <Ionicons name="create-outline" size={20} color={colors.WHITE} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.separator]} />
          <StyledButton
            title="ESQUECEU SUA SENHA?"
            onPress={handleForgetPassword}
            style={styles.forgotPasswordButton}
          />
          <View style={styles.separator} />

          <StyledButton
            title="CRIAR TAREFA"
            onPress={() => navigation.navigate(ScreenNames.CREATE_TASK)}
            style={[globalStyles.button, { backgroundColor: colors.WHITE, borderColor: colors.BLUE, borderWidth: 1 }]}
            textStyle={{ color: colors.BLUE }}
          />

          <StyledButton
            title="VER TAREFAS"
            onPress={() => navigation.navigate(ScreenNames.VIEW_TASKS)}
            style={[globalStyles.button, { backgroundColor: colors.BLUE }]}
          />

          <StyledButton
            title="VER FEEDBACKS"
            onPress={() => navigation.navigate(ScreenNames.FEEDBACK_LIST)}
            style={[globalStyles.button, { backgroundColor: colors.PURPLE }]}
          />

          <StyledButton
            title="Sair"
            onPress={handleLogout}
            style={{ backgroundColor: colors.PINK }}
            textStyle={{ color: colors.WHITE }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
  },

  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  editProfileButton: {
    backgroundColor: colors.YELLOW,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.WHITE,
    fontSize: sizeFonts.SMALL,
    marginRight: 20,
    fontFamily: 'MinhaFonte',
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.BLUE,
    marginBottom: 25,
  },
  
  forgotPasswordButton: {
    alignSelf: 'center',
    backgroundColor: colors.PINK,
    padding: 16,
    borderRadius: 10,
  },
});
