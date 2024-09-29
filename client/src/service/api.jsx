import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

let API_URL = '';

// Função para verificar se está em um emulador
const isEmulator = () => {
  return (
    Platform.OS === 'android' &&
    Platform.constants?.reactNativeVersion
  );
};

// Função para configurar o URL da API
const configureAPIUrl = (ip) => {
  API_URL = isEmulator() ? 'http://10.0.2.2:5000' : `http://${ip}:5000`;
};

// Função para obter o IP local usando NetInfo
const getLocalIP = async () => {
  const state = await NetInfo.fetch();
  if (state.details && state.details.ipAddress) {
    return state.details.ipAddress;
  }
  return null;
};

// Função para inicializar a configuração da API
export const initializeAPI = async () => {
  const localIP = await getLocalIP();
  configureAPIUrl(localIP);
};

export const getAPIUrl = () => API_URL;