import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { firebase } from '../../../../config';

const Card = ({ navigation }) => {

    const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users')
        .doc(user.uid).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUsuario(snapshot.data());
          } else {
            console.log('Usuário não existe');
          }
        })
        .catch((error) => {
          console.error("Erro ao obter usuário:", error);
        });
    }
  }, []);

  return (
    <View style={{width: "95%"}}>
        <View style={styles.menuContainer}>
            <Text style={{fontSize: 25}}>Início</Text>
            {/*<Text style={{fontSize: 17, color: '#353535'}}>
                Olá, {usuario?.name}!
            </Text>*/}
        </View>
        <View style={styles.card}>
        </View>
    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
    menuContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },

    card: {
        height: 200,
        backgroundColor: '#E3E3E3',
        marginBottom: 17,
        borderRadius: 10,
    },
});