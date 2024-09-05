// /src/dao/UserDAO.js
import { firebaseAuth, firestore, storage } from '../firebase/firebaseServices';

const usersCollection = firestore.collection('users');

const UserDAO = {
  registerUser: async (email, password, name, profileImage) => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      let profileImageUrl = '';
      if (profileImage) {
        const storageRef = storage.ref();
        const profileImageRef = storageRef.child(`profileImages/${user.uid}`);
        await profileImageRef.put(profileImage);
        profileImageUrl = await profileImageRef.getDownloadURL();
      }

      await usersCollection.doc(user.uid).set({
        email: user.email,
        name: name,
        profileImageUrl: profileImageUrl,
        createdAt: new Date()
      });

      return user;
    } catch (error) {
      console.error("Erro ao registrar usuário: ", error);
      throw new Error(error.message);
    }
  },

  loginUser: async (email, password) => {
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      throw new Error(error.message);
    }
  },

  logoutUser: async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
      throw new Error(error.message);
    }
  },

  getUserData: async (uid) => {
    try {
      const userDoc = await usersCollection.doc(uid).get();
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        console.error("Usuário não encontrado");
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário: ", error);
      throw new Error(error.message);
    }
  },

  updateUserData: async (uid, updatedData) => {
    try {
      if (updatedData.profileImage) {
        const storageRef = storage.ref();
        const profileImageRef = storageRef.child(`profileImages/${uid}`);
        await profileImageRef.put(updatedData.profileImage);
        updatedData.profileImageUrl = await profileImageRef.getDownloadURL();
        delete updatedData.profileImage; // Remover profileImage para não tentar salvar no Firestore
      }

      await usersCollection.doc(uid).update({
        ...updatedData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      throw new Error(error.message);
    }
  }
};

export default UserDAO;
