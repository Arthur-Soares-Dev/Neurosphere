import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { initializeAPI, getAPIUrl } from '../service/api';

let API_URL = '';

(async function () {
    await initializeAPI(); // Inicialize a API antes de fazer qualquer requisição
    API_URL = getAPIUrl(); // Obtenha a URL da API
})()


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    console.log("Tentando fazer login com", email);
    try {
        console.log('URL da API para login:', `${API_URL}/auth/login`);
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response.data.message || error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
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
      await axios.post(`${API_URL}/auth/forget-password`, { email });
    } catch (error) {
      console.error("Erro ao enviar email de redefinição de senha:", error);
      throw new Error(error.message);
    }
  };

  const registerUser = async (email, password, name) => {
    console.log("Tentando registrar com", email);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { email, password, name });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw new Error(error.response.data.message || error.message);
    }
  };

  const updateUser = async (uid, updatedData, currentPassword = '', newPassword = '', profileImage = null) => {
    console.log("Tentando atualizar o usuário com UID:", uid);
    try {
      const updates = {};

      if (updatedData.name) updates.name = updatedData.name;
      if (updatedData.email) updates.email = updatedData.email;

      // Faz a requisição para atualizar o usuário
      const response = await axios.put(`${API_URL}/auth/update/${uid}`, { ...updates, currentPassword, newPassword, profileImage });
      
      const updatedUser = response.data;
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      throw new Error(error.response.data.message || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, forgetPassword, registerUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
