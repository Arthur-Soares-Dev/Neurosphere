import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebase } from '../config';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          setUserId(user.uid);
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setName(userData.name || '');
            setEmail(userData.email || '');
            setProfileImage(userData.profileImage || '');
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        Alert.alert('Error', 'Failed to fetch user data. Please check your internet connection.');
      }
    };

    fetchUserData();
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
      setProfileImage(source.uri);

      const fetchAndUpload = async () => {
        try {
          const response = await fetch(source.uri);
          const blob = await response.blob();
          const uploadTask = firebase.storage().ref().child(`profileImages/${userId}`).put(blob);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Handle upload progress
            },
            (error) => {
              console.error('Upload Error: ', error);
              Alert.alert('Error', 'Failed to upload image');
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setProfileImage(downloadURL);
                firebase.firestore().collection('users').doc(userId).update({ profileImage: downloadURL });
              });
            }
          );
        } catch (error) {
          console.error('Upload Error: ', error);
          Alert.alert('Error', 'Failed to upload image');
        }
      };

      fetchAndUpload();
    }
  };

  const handleUpdate = async () => {
    if (!userId) return;

    const updates = {};
    if (name !== '') updates.name = name;
    if (email !== '') updates.email = email;

    try {
      await firebase.firestore().collection('users').doc(userId).update(updates);

      if (newPassword !== '') {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPassword);
      }

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert('Error', 'Failed to update profile!');
    }
  };

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
        <Text style={styles.label}>Senha Nova</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Senha Nova"
            secureTextEntry={!showCurrentPassword}
          />
          <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <Ionicons name={showCurrentPassword ? "eye" : "eye-off"} size={24} color="gray" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FD7FAC', marginTop: 20 }]}
        onPress={() => {
          firebase.auth().signOut()
            .then(() => {
              navigation.navigate('Login');
            })
            .catch((error) => {
              console.error("Erro ao fazer logout:", error);
            });
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