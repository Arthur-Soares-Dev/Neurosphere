import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Games = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FD7FAC" />
      </TouchableOpacity>

      <Text style={styles.title}>Jogos</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#FD7FAC30', borderColor: '#FD7FAC' }]}
              onPress={() => navigation.navigate('MathGame')}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="calculator" size={40} color="#EB0054" />
              </View>
            </TouchableOpacity>
            <Text style={styles.cardText}>Jogo de Matématica</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#35353530', borderColor: '#151515' }]}
              onPress={() => navigation.navigate('WordGame')}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="book" size={40} color="#353535" />
              </View>
            </TouchableOpacity>
            <Text style={styles.cardText}>Jogo da Forca</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#35353530', borderColor: '#151515' }]}
              onPress={() => navigation.navigate('ColorGame')}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="color-palette-outline" size={40} color="#353535" />
              </View>
            </TouchableOpacity>
            <Text style={styles.cardText}>Jogo das Cores</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#FD7FAC30', borderColor: '#FD7FAC' }]}
              onPress={() => navigation.navigate('EmotionGame')}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="happy-outline" size={40} color="#EB0054" />
              </View>
            </TouchableOpacity>
            <Text style={styles.cardText}>Jogo de Emoções</Text>
          </View>


        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  scrollContainer: {
    flexGrow: 1, 
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Games;
