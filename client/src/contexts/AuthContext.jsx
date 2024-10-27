import React, {createContext, useContext, useEffect, useState} from 'react';
import api from '../service/api'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLoading} from './LoadingContext';


const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const {startLoading, stopLoading} = useLoading();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const savedUserId = await AsyncStorage.getItem('userId');
        if (savedUserId) {
          const response = await api.get(`/auth/user/${savedUserId}`);
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao verificar login persistido:', error);
        setUser(null);
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    startLoading();
    console.log("Tentando fazer login com", email);
    try {
      const response = await api.post(`/auth/login`, {email, password});
      setUser(response.data);
      await AsyncStorage.setItem('userId', response.data.uid);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response.data.message || error.message);
    } finally {
      stopLoading();
    }
  };

  const logout = async () => {
    startLoading();
    try {
      await api.post(`/auth/logout`, {}, {withCredentials: true});
      setUser(null);
      await AsyncStorage.removeItem('userId'); // Remove o ID do usuário do AsyncStorage
      const savedUser = await AsyncStorage.getItem('user');
      console.log("Dados no AsyncStorage após logout:", savedUser);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw new Error(error.message);
    } finally {
      stopLoading();
    }
  };


  const forgetPassword = async (email) => {
    startLoading();
    try {
      if (!email) {
        alert("Email inválido");
        return;
      }
      await api.post(`/auth/forget-password`, {email});
    } catch (error) {
      console.error("Erro ao enviar email de redefinição de senha:", error);
      throw new Error(error.message);
    } finally {
      stopLoading();
    }
  };

  const registerUser = async (email, password, name) => {
    startLoading();
    console.log("Tentando registrar com", email);
    try {
      const response = await api.post(`/auth/register`, {email, password, name});
      setUser(response.data);
      await AsyncStorage.setItem('userId', response.data.id);

      return response.data;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw new Error(error.response.data.message || error.message);
    } finally {
      stopLoading();
    }
  };

  const updateUser = async (uid, updatedData) => {
    startLoading();
    console.log("Tentando atualizar o usuário com UID:", uid);

    try {
      const updates = {};

      for (const key in updatedData) {
        if (updatedData.hasOwnProperty(key) && updatedData[key] !== undefined) {
          updates[key] = updatedData[key];
        }
      }

      const response = await api.put(`/auth/update/${uid}`, updates);

      const updatedUser = response.data;
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      throw new Error(error.response?.data?.message || error.message);
    } finally {
      stopLoading();
    }
  };


  const getAuthToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    throw new Error('Usuário não autenticado');
  };

  return (
    <AuthContext.Provider value={{user, login, logout, forgetPassword, registerUser, updateUser, getAuthToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
