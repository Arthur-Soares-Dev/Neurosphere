import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import {ScreenNames} from "../enums/ScreenNames";
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';

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
          <View style = {styles.container}>
            <Text style={[globalStyles.tittle, styles.title]}>
              {user?.pin ? 'INSERIR PIN' : 'CRIAR NOVO PIN'}
            </Text>
            <TouchableOpacity style = {styles.closebutton} onPress={onClose}>
                <Ionicons name="close-outline" size={30} color={colors.YELLOW} />
            </TouchableOpacity>
          </View>
          <Text style={[globalStyles.label, styles.label]}>
            DIGITE SEU PIN:
          </Text>
          <TextInput
            style={[globalStyles.input, styles.textInput, globalStyles.inputText]}
            value={pin}
            onChangeText={text => {
              // Permitir apenas números
              const numericText = text.replace(/[^0-9]/g, '');
              setPin(numericText);
            }}
            // placeholder="Digite um PIN (4 dígitos)"
            keyboardType="numeric" // Mostra o teclado numérico
            maxLength={4} // Limita o comprimento do PIN
          />
          <TouchableOpacity style={globalStyles.button} onPress={handleConfirm}>
            <Text style={globalStyles.buttonText}>DESBLOQUEAR</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={globalStyles.button} onPress={onClose}>
            <Text style={globalStyles.buttonText}>Cancelar</Text>
          </TouchableOpacity> */}
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
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },

  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontSize: sizeFonts.MEDIUM,
    color: colors.YELLOW,
    marginBottom: 20,
    marginLeft: '33%',
  },

  label: {
    alignSelf: 'center',
    marginBottom: 20
  },

  textInput: {
    padding: 10,
    minHeight: 50,
    marginBottom: 20,
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

  closebutton: {
    marginBottom: 20,
  },

});

export default PinDialog;
