import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import api from '../service/api'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLoading} from './LoadingContext';
import {auth} from '../firebase/firebaseConfig';
import {sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import AlertsUtils from "../utils/AlertsUtils";
import Utils from "../utils/Utils";


const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const {startLoading, stopLoading} = useLoading();
  const [error, setError] = useState({title: null, message: null});
  const [success, setSuccess] = useState({title: null, message: null});
  const firstRender = useRef(true);
  useEffect(() => {
      if (firstRender.current) {
          firstRender.current = false;
          return;
      }
      if (error?.title || error?.message) {
          AlertsUtils.dangerToast(error.title, error.message);
          setError({title: null, message: null})
      }
  }, [error]);

  useEffect(() => {
      if (firstRender.current) {
          firstRender.current = false;
          return;
      }
      if (success?.title || success?.message) {
          AlertsUtils.successToast(success.title, success.message);
          setSuccess({title: null, message: null})
      }
  }, [success]);


  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        startLoading()
        const savedUserId = await AsyncStorage.getItem('userId');
        if (savedUserId) {
          const response = await api.get(`/auth/user/${savedUserId}`);
          setUser(Utils.removeTitleAndMessage(response.data));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao verificar login persistido:', error);
        setUser(null);
      }
      finally {
        stopLoading()
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    startLoading();
    console.log("Tentando fazer login com", email);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('userCredential',userCredential)
      const token = await userCredential.user.getIdToken();
      console.log('token',token)

      const response = await api.post(
        `/auth/login`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUser(Utils.removeTitleAndMessage(response.data));
      await AsyncStorage.setItem('userId', response.data.uid);
      return Utils.removeTitleAndMessage(response.data);
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      let errorMessage = 'Erro desconhecido';

      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Usuário não encontrado. Verifique o e-mail e tente novamente.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Senha incorreta. Verifique sua senha e tente novamente.';
            break;
          case 'auth/missing-password':
            errorMessage = 'A senha é obrigatória.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'O e-mail fornecido é inválido.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
            break;
          default:
            errorMessage = error.message || 'Erro desconhecido';
            break;
        }
      }

      // Alert.alert(errorMessage)
      setError({
        title: "Erro ao fazer login",
        message: errorMessage,
      })
      throw new Error(errorMessage);
    } finally {
      stopLoading();
    }
  };

  const logout = async () => {
  startLoading();
  try {
    const response = await api.post(`/auth/logout`, {}, { withCredentials: true });
    setUser(null); // Limpa o estado do usuário após logout
    await AsyncStorage.removeItem('userId'); // Remove o ID do usuário do AsyncStorage
    setSuccess({
      title: response.data?.title ?? "Sucesso",
      message: response.data?.message ?? "",
    })
  } catch (error) {
    setError({
      title: error.title ?? "Erro",
      message: error.message ?? "Tente novamente mais tarde.",
    })
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
                setError({
                    title: "Email inválido",
                    message: "Digite o email no campo adequado.",
                });
                return;
            }

            await sendPasswordResetEmail(auth, email);

            setSuccess({
                title: "Sucesso",
                message: "Instruções de redefinição de senha foram enviadas para o seu e-mail.",
            });
        } catch (error) {
            setError({
                title: "Erro",
                message: error.message ?? "Tente novamente mais tarde.",
            });
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
      const response = await api.post(`/auth/register`, { email, password, name });
      setUser(Utils.removeTitleAndMessage(response.data));
      await AsyncStorage.setItem('userId', response.data.uid);
      setSuccess({
        title: response.data?.title ?? "Sucesso",
        message: response.data?.message ?? "",
      })
      return Utils.removeTitleAndMessage(response.data);
    } catch (error) {
      // console.error("Erro ao registrar usuário:", error);
      setError({
        title: error.title ?? "Erro",
        message: error.message ?? "Tente novamente mais tarde.",
      })
      throw new Error(error.response?.data?.message || error.message);
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
      setUser(Utils.removeTitleAndMessage(updatedUser));

      setSuccess({
        title: response.data?.title ?? "Sucesso",
        message: response.data?.message ?? "",
      })

      return Utils.removeTitleAndMessage(updatedUser);
    } catch (error) {
      setError({
        title: error.title ?? "Erro",
        message: error.message ?? "Tente novamente mais tarde.",
      })
      console.error("Erro ao atualizar o usuário:", error);
      throw new Error(error.response?.data?.message || error.message);
    } finally {
      stopLoading();
    }
  };

  const updateUserProfileImage = async (formData) => {
    startLoading();
    console.log("Tentando atualizar a imagem de perfil", formData);
    try {
      const response = await api.put(`/auth/update/${user.uid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = response.data;
      setUser(Utils.removeTitleAndMessage(updatedUser));
      setSuccess({
        title: response.data?.title ?? "Sucesso",
        message: response.data?.message ?? "",
      })
    } catch (error) {
      setError({
        title: error.title ?? "Erro",
        message: error.message ?? "Tente novamente mais tarde.",
      })
      console.error("Erro ao atualizar a imagem de perfil:", error);
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
    <AuthContext.Provider value={
      {user, 
      login, 
      logout, 
      forgetPassword, 
      registerUser, 
      updateUser,
      // checkCurrentPassword, 
      updateUserProfileImage,
      getAuthToken,}
    }>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
