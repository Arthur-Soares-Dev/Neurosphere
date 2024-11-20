import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { cardProps } from '../components/AudioDialogue/CardProps';
import GoBackButton from '../components/GoBackButton';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';

const AudioDialogueScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('responses');
  const [selectedCards, setSelectedCards] = useState([]);

  const borderColors = [colors.BLUE, colors.PINK, colors.PURPLE, colors.YELLOW, colors.GREEN];

  const speakCard = (card) => {
    const options = {
      language: 'pt-BR',
      rate: 0.9,
    };
    Speech.speak(card.audio, options);
  };

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

  const addCardToTop = (card) => {
    if (selectedCards.length < 3) {
      const cardWithId = { ...card, id: Date.now() + Math.random() }; // Adiciona um ID único
      setSelectedCards([...selectedCards, cardWithId]);
    }
  };

  const removeCard = (id) => {
    setSelectedCards(selectedCards.filter(card => card.id !== id));
  };

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
    { key: 'responses', icon: 'chatbox-outline', label: 'RESPOSTAS' },
    { key: 'emotions', icon: 'happy-outline', label: 'EMOÇÕES' },
    { key: 'actions', icon: 'hand-left-outline', label: 'AÇÕES' },
    { key: 'food', icon: 'pizza-outline', label: 'COMIDAS' },
    { key: 'health', icon: 'medkit-outline', label: 'SAÚDE' },
    { key: 'places', icon: 'home-outline', label: 'LUGARES' },
  ];

  const renderSelectedItem = ({ item, index, drag, isActive }) => {
    return (
      <View style={[styles.selectedCardContainer, { opacity: isActive ? 0.5 : 1 }]}>
        <TouchableOpacity
          style={styles.selectedCard}
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
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeCard(item.id)} // Passa o ID único para a função de remoção
        >
          <Ionicons name="close" size={16} color={colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.outerContainer}>
      <View style={[globalStyles.scrollContainer, { flexGrow: 0 }]}>
        <GoBackButton title={"PAINEL DE FRASES"} />
      </View>

      <View style={[globalStyles.scrollContainer, { paddingTop: 0 }]}>
        <View style={styles.topSection}>
          <DraggableFlatList
            data={selectedCards}
            renderItem={renderSelectedItem}
            keyExtractor={(item, index) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => setSelectedCards(data)}
            horizontal={true}
          />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.trashButton} onPress={clearCards}>
            <Ionicons name="trash-outline" size={24} color={colors.PURPLE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={speakAll}>
            <Ionicons name="play" size={30} color={colors.WHITE} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={cardProps[selectedCategory]}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '100%' }}
        />
      </View>

      <View style={styles.bottomBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[styles.iconContainer,
                selectedCategory === category.key,
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Ionicons name={category.icon} size={28} color={selectedCategory === category.key ? colors.PINK : colors.BLUE} />
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  button: {
    height: 150,
    width: '48%',
    backgroundColor: colors.WHITE,
    borderColor: colors.PINK,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  buttonText: {
    fontSize: 22,
    color: colors.BLUE,
    marginBottom: 20,
    fontFamily: 'MinhaFonte'
  },

  tinyLogo: {
    width: 50,
    height: 50,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: colors.BLUE,
  },

  iconContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  selecticonText: {
    color: colors.PINK,
  },

  iconText: {
    fontSize: 12,
    color: colors.BLUE,
    marginTop: 5,
    fontFamily: 'MinhaFonte',
  },

  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
    backgroundColor: colors.WHITE,
    borderWidth: 2,
    borderColor: colors.BLUE,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  selectedCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  selectedCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedCardText: {
    fontSize: 16,
    color: colors.BLUE,
  },

  removeButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.BLUE,
    borderRadius: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },

  actionButton: {
    backgroundColor: colors.PINK,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: ' center',
    alignItems: 'center',
    width: '75%',
  },

  trashButton: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PURPLE,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
});
