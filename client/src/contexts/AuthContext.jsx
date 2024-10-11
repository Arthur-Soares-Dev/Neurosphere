import React, {createContext, useContext, useState} from 'react';
import api from '../service/api'


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    console.log("Tentando fazer login com", email);
    try {
        // console.log('URL da API para login:', `${API_URL}/auth/login`);
        const response = await api.post(`/auth/login`, { email, password });
        setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.response.data.message || error.message);
    }
  };

  const logout = async () => {
    try {
      await api.post(`/auth/logout`, {}, { withCredentials: true });
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

  const updateUser = async (uid, updatedData, currentPassword = '', newPassword = '', profileImage = null) => {
    console.log("Tentando atualizar o usuário com UID:", uid);
    try {
      const updates = {};

      if (updatedData.name) updates.name = updatedData.name;
      if (updatedData.email) updates.email = updatedData.email;

      // Faz a requisição para atualizar o usuário
      const response = await api.put(`$/auth/update/${uid}`, { ...updates, currentPassword, newPassword, profileImage });
      
      const updatedUser = response.data;
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      throw new Error(error.response.data.message || error.message);
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
