import React, {createContext, useContext, useEffect, useState} from 'react';
import {firebaseAuth, firestore, storage} from '../firebase/firebaseServices';

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

  const registerUser = async (email, password, name) => {
    console.log("Tentando registrar com", email, password, name);
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      console.log("Registro bem-sucedido", userCredential.user);

      const user = userCredential.user;
      await firestore.collection('users').doc(user.uid).set({
        name: name,
        email: email,
      });

      setUser({ uid: user.uid, name: name, email: email });
      return userCredential.user;
    } catch (error) {
      console.error("Erro ao registrar usuário: ", error);
      throw new Error(error.message);
    }
  };

  const updateUser = async (uid, updatedData, currentPassword = '', newPassword = '', profileImage = null) => {
    console.log("Tentando atualizar o usuário com UID:", uid);
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();

      if (!userDoc.exists) {
        throw new Error("Usuário não encontrado.");
      }

      const updates = {};

      if (updatedData.name) updates.name = updatedData.name;
      if (updatedData.email) updates.email = updatedData.email;

      if (profileImage) {
        // Se profileImage parece ser uma URL
        if (profileImage.startsWith('http')) {
          updates.profileImage = profileImage;
        } else {
          // Caso profileImage seja um objeto com a URI da imagem
          const storageRef = storage.ref();
          const profileImageRef = storageRef.child(`profileImages/${uid}`);

          const response = await fetch(profileImage.uri);
          if (!response.ok) {
            throw new Error('Falha ao buscar a imagem. Status: ' + response.status);
          }

          const blob = await response.blob();
          const snapshot = await profileImageRef.put(blob);

          updates.profileImage = await snapshot.ref.getDownloadURL();
        }
      }

      if (Object.keys(updates).length > 0) {
        await firestore.collection('users').doc(uid).update(updates);
      }

      if (newPassword !== '' && currentPassword !== '') {
        const user = firebaseAuth.currentUser;
        if (!user) {
          throw new Error("Usuário não autenticado.");
        }

        const credential = firebaseAuth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPassword);
      }

      const updatedUser = { uid, ...userDoc.data(), ...updates };
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, forgetPassword, registerUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
