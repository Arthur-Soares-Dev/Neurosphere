import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TaskList from '../components/Dashboard/DashboardTasks';
import Card from '../components/Dashboard/DashboardCard';
import ButtonCards from '../components/Dashboard/DashboardCard/buttonCards';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import PinDialog from './PinDialog'; // Importe seu PinDialog

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false); // Estado para controlar a visibilidade do PinDialog

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Olá, {user?.name}!
        </Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => setIsPinDialogOpen(true)} // Abre o PinDialog
        >
          <Image
            source={user?.profileImage ? { uri: user?.profileImage } : require('../../assets/default-avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <Card />
      <ButtonCards />
      <TaskList />

      {/* Adicione o PinDialog ao componente */}
      <PinDialog
        isOpen={isPinDialogOpen}
        onClose={() => setIsPinDialogOpen(false)} // Fecha o PinDialog
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

export default DashboardScreen;

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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
