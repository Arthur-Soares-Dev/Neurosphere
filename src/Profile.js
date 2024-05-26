import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Profile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          setUserId(user.uid);
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          const userData = userDoc.data();
          if (userData) {
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
            setEmail(userData.email || '');
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

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
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
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

      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS633GIo1_mV3D9K08VUN6v5_FJClbCt2WT7piEr2JMd4JPGXDCIJBy8b3EqiSCjRlGks' }}
        style={styles.avatar}
      />
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
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
