import React, {createContext, useContext, useEffect, useState} from 'react';
import api from '../service/api'
import AsyncStorage from "@react-native-async-storage/async-storage";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser)); // Carrega o usuário do AsyncStorage
        } else {
          setUser(null); // Se não há dados no AsyncStorage, definir como null
        }
      } catch (error) {
        console.error('Erro ao verificar login persistido:', error);
        setUser(null); // Em caso de erro, garantir que o usuário seja null
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    console.log("Tentando fazer login com", email);
    try {
        // console.log('URL da API para login:', `${API_URL}/auth/login`);
        const response = await api.post(`/auth/login`, { email, password });
        setUser(response.data);
      await AsyncStorage.setItem('user', JSON.stringify(response.data)); // Salva os dados do usuário no AsyncStorage
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response.data.message || error.message);
    }
  };

  const logout = async () => {
    console.log('logout context')
    try {
      await api.post(`/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      await AsyncStorage.removeItem('user'); // Remover dados do AsyncStorage
      const savedUser = await AsyncStorage.getItem('user');
      console.log("Dados no AsyncStorage após logout:", savedUser); // Verifica se realmente foi removido
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw new Error(error.message);
    }
  };


  const forgetPassword = async (email) => {
    try {
      if (!email) {
        alert("Email inválido");
        return;
      }
      await api.post(`/auth/forget-password`, { email });
    } catch (error) {
      console.error("Erro ao enviar email de redefinição de senha:", error);
      throw new Error(error.message);
    }
  };

  const registerUser = async (email, password, name) => {
    console.log("Tentando registrar com", email);
    try {
      const response = await api.post(`/auth/register`, { email, password, name });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw new Error(error.response.data.message || error.message);
    }
  };

  const updateUser = async (uid, updatedData) => {
    console.log("Tentando atualizar o usuário com UID:", uid);

    try {
      const updates = {};

      for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key) && updatedData[key] !== undefined) {
          updates[key] = updatedData[key];
        }
      }

      // Faz a requisição para atualizar o usuário no servidor
      const response = await api.put(`/auth/update/${uid}`, updates);

      const updatedUser = response.data;
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  const getAuthToken = async () => {
    if (user) {
      return await user.getIdToken(); // Obtém o token do usuário
    }
    throw new Error('Usuário não autenticado');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, forgetPassword, registerUser, updateUser, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
