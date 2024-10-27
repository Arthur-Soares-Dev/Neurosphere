import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { cardProps } from '../components/AudioDialogue/CardProps';

const AudioDialogueScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('emotions');
  const [selectedCards, setSelectedCards] = useState([]);

  const borderColors = ['#FD7FAC', '#7FACD6', '#353535'];

  /**
   * Fala o áudio do card selecionado.
   * @param {Object} card - O card que contém o áudio a ser falado.
   */
  const speakCard = (card) => {
    const options = {
      language: 'pt-BR',
      rate: 0.9,
    };
    Speech.speak(card.audio, options);
  };

  /**
   * Fala o áudio de todos os cards selecionados em sequência.
   */
  const speakAll = () => {
    const options = {
      language: 'pt-BR',
      rate: 0.9,
    };
    selectedCards.forEach((card, index) => {
      setTimeout(() => {
        Speech.speak(card.audio, options);
      }, index * 1000);
    });
  };

  /**
   * Adiciona um card ao topo da lista de cards selecionados.
   * @param {Object} card - O card a ser adicionado.
   */
  const addCardToTop = (card) => {
    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  /**
   * Limpa todos os cards selecionados.
   */
  const clearCards = () => {
    setSelectedCards([]);
  };

  const renderItem = ({ item, index }) => {
    const borderColor = borderColors[index % borderColors.length];
    return (
      <TouchableOpacity
        style={[styles.button, { borderColor: borderColor }]}
        onPress={() => addCardToTop(item)}
      >
        <Text style={styles.buttonText}>{item.title}</Text>
        <Image style={styles.tinyLogo} source={item.uri} />
      </TouchableOpacity>
    );
  };

  const categories = [
    { key: 'emotions', icon: 'happy-outline', label: 'Emotions' },
    { key: 'food', icon: 'pizza-outline', label: 'Food' },
    { key: 'actions', icon: 'hand-left-outline', label: 'Actions' },
    { key: 'health', icon: 'medkit-outline', label: 'Health' },
    { key: 'places', icon: 'home-outline', label: 'Places' },
    { key: 'responses', icon: 'chatbox-outline', label: 'Responses' }
  ];

  const renderSelectedItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={[styles.selectedCard, { opacity: isActive ? 0.5 : 1 }]}
        onLongPress={drag}
        delayLongPress={0}
        onPressOut={drag}
        onPress={() => {
          if (index === 0) {
            speakCard(item);
          }
        }}
      >
        <Text style={styles.selectedCardText}>{item.title}</Text>
        <Image style={styles.tinyLogo} source={item.uri} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#FD7FAC" />
      </TouchableOpacity>
      <Text style={styles.menuContainer}>Painel de Frases</Text>

      <View style={styles.topSection}>
        <DraggableFlatList
          data={selectedCards}
          renderItem={renderSelectedItem}
          keyExtractor={(item, index) => `draggable-item-${item.title}`}
          onDragEnd={({ data }) => setSelectedCards(data)}
          horizontal={true}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={speakAll}>
          <Text style={styles.actionButtonText}>Falar Frases</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={clearCards}>
          <Text style={styles.actionButtonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cardProps[selectedCategory]}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[styles.iconContainer,
                selectedCategory === category.key && styles.selectedIconContainer,
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Ionicons name={category.icon} size={28} color={selectedCategory === category.key ? '#FD7FAC' : '#7FACD6'} />
              <Text style={styles.iconText}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AudioDialogueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    marginLeft: 5,
    marginBottom: 10,
  },
  menuContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderColor: '#026efd',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#353535',
    marginBottom: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  iconContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  selectedIconContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#FD7FAC',
  },
  iconText: {
    fontSize: 12,
    color: '#7FACD6',
    marginTop: 5,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  selectedCard: {
    alignItems: 'center',
    marginRight: 10,
  },
  selectedCardText: {
    fontSize: 16,
    color: '#353535',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  actionButton: {
    backgroundColor: '#FD7FAC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
