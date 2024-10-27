import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import {ScreenNames} from "../enums/ScreenNames";

const PinDialog = ({ isOpen, onClose, navigation }) => {
  const [pin, setPin] = useState('');
  const { user, updateUser } = useAuth();

  useEffect(() => {
    console.log('user',user)
    if (user) {
      setPin('');
    }
  }, [isOpen, user]);

  const handleConfirm = async () => {
    try {
      console.log('user2',user)
      if (user?.pin) {
        if (pin === user.pin) {
          Alert.alert('Sucesso', 'PIN correto!');
          navigation.navigate(ScreenNames.PROFILE);
          onClose();
        } else {
          Alert.alert('Erro', 'PIN incorreto. Tente novamente.');
          setPin('');
        }
      } else {
        // Lógica para criar um novo PIN
        if (pin.length === 4) {
          await updateUser(user.uid, { pin });
          Alert.alert('Sucesso', 'Novo PIN criado com sucesso!');
          onClose();
          navigation.navigate(ScreenNames.PROFILE);
        } else {
          Alert.alert('Erro', 'O novo PIN deve ter 4 dígitos.');
        }
      }
    } catch (error) {
      console.error('Erro ao processar PIN:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação.');
    }
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>
            {user?.pin ? 'Inserir PIN' : 'Criar Novo PIN'}
          </Text>
          <Text style={styles.label}>
            Digite seu PIN:
          </Text>
          <TextInput
            style={styles.textInput}
            value={pin}
            onChangeText={text => {
              // Permitir apenas números
              const numericText = text.replace(/[^0-9]/g, '');
              setPin(numericText);
            }}
            placeholder="Digite um PIN (4 dígitos)"
            keyboardType="numeric" // Mostra o teclado numérico
            maxLength={4} // Limita o comprimento do PIN
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4081',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#FF4081',
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 50,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#87CEFA',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FFB6C1',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PinDialog;
