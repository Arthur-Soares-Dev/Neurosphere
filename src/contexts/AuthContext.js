import React, { createContext, useState, useEffect, useContext } from 'react';
import { firebaseAuth, firestore } from '../firebase/firebaseServices';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Usuário autenticado:", user);
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUser({ uid: user.uid, ...userDoc.data() });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    console.log("Tentando fazer login com", email, password);
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      console.log("Login bem-sucedido", userCredential.user);
      const userDoc = await firestore.collection('users').doc(userCredential.user.uid).get();
      if (userDoc.exists) {
        setUser({ uid: userCredential.user.uid, ...userDoc.data() });
      }
      return userCredential.user;
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await firebaseAuth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
      throw new Error(error.message);
    }
  };

  const forgetPassword = async (email) => {
    try {
      if (!email) {
        alert("Email inválido");
        return
      }
      await firebaseAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error("Erro ao enviar email de redefinição de senha: ", error);
      throw new Error(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, forgetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
