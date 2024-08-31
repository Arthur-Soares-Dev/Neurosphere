// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';

// const Games = ({navigation}) => {

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={30} color="#FD7FAC" />
//       </TouchableOpacity>

//       <Text style={styles.title}>Jogos</Text>

//       <View style={styles.cardContainer}>
//         <View style={styles.cardWrapper}>
//           <TouchableOpacity
//             style={[styles.card, { backgroundColor: '#FD7FAC' }]}
//             onPress={() => navigation.navigate('MathGame')}
//           />
//           <Text style={styles.cardText}>Contas</Text>
//         </View>

//         <View style={styles.cardWrapper}>
//           <TouchableOpacity
//             style={[styles.card, { backgroundColor: '#353535' }]}
//             onPress={() => navigation.navigate('WordGame')}
//           />
//           <Text style={styles.cardText}>Palavras</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     padding: 20,
//   },
//   backButton: {
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginVertical: 20,
 
//   },
//   cardContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
    
//   },
//   cardWrapper: {
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   card: {
//     width: 150,
//     height: 125,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardText: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });

// export default Games;

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
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
              style={[styles.card, { backgroundColor: '#FD7FAC' }]}
              onPress={() => navigation.navigate('MathGame')}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="calculator" size={40} color="#FD7FAC" />
              </View>
            </TouchableOpacity>
            <Text style={styles.cardText}>Contas</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: '#353535' }]}
              onPress={() => navigation.navigate('WordGame')}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="book" size={40} color="#353535" />
              </View>
            </TouchableOpacity>
            <Text style={styles.cardText}>Palavras</Text>
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
    marginTop: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Games;
