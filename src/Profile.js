import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';

const Profile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          setUserId(user.uid);
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
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
    if (firstName !== '') updates.firstName = firstName;
    if (lastName !== '') updates.lastName = lastName;
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
        <View style={styles.backButtonCircle} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/default-avatar.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={styles.changePicture}>Change Picture</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Id</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email Id"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current Password"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
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
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  changePicture: {
    color: '#353535',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 36,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    width: '60%',
    backgroundColor: '#353535',
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
