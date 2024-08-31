import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Games = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FD7FAC" />
      </TouchableOpacity>

      <Text style={styles.title}>Jogos</Text>

      <View style={styles.cardContainer}>
        <View style={styles.cardWrapper}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#FD7FAC' }]}
            onPress={() => navigation.navigate('MathGame')}
          />
          <Text style={styles.cardText}>Contas</Text>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#353535' }]}
            onPress={() => navigation.navigate('WordGame')}
          />
          <Text style={styles.cardText}>Palavras</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
 
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  cardWrapper: {
    alignItems: 'center',
    marginRight: 20,
  },
  card: {
    width: 150,
    height: 125,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Games;
