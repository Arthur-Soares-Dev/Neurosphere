import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TaskList from './components/Dashboard/DashboardTasks';
import Card from './components/Dashboard/DashboardCard';
import ButtonCards from './components/Dashboard/DashboardCard/buttonCards';
import {useAuth} from './contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Olá, {user?.name}!
        </Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={user?.profileImage ? { uri: user?.profileImage } : require('../assets/default-avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <Card />
      <ButtonCards />
      <TaskList />
    </SafeAreaView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
