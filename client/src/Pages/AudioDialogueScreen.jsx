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
  const [selectedCategory, setSelectedCategory] = useState('emotions');
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

  /**
   * Adiciona um card ao topo da lista de cards selecionados.
   * @param {Object} card - O card a ser adicionado.
   */
  const addCardToTop = (card) => {
    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card]);
    }
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
    { key: 'emotions', icon: 'happy-outline', label: 'EMOÇÕES' },
    { key: 'food', icon: 'pizza-outline', label: 'COMIDAS' },
    { key: 'actions', icon: 'hand-left-outline', label: 'AÇÕES' },
    { key: 'health', icon: 'medkit-outline', label: 'SAÚDE' },
    { key: 'places', icon: 'home-outline', label: 'LUGARES' },
    { key: 'responses', icon: 'chatbox-outline', label: 'RESPOSTAS' }
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
    <SafeAreaView style={globalStyles.outerContainer}>

      <View style={globalStyles.scrollContainer}>

        <GoBackButton title={"PAINEL DE FRASES"}/>

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
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
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

  selectedCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  selectedCardText: {
    fontSize: 16,
    color: colors.BLUE,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  actionButton: {
    backgroundColor: colors.PINK,
    paddingVertical: 10,
    paddingHorizontal: 105,
    borderRadius: 10,
    justifyContent: ' center',
    alignItems: 'center',
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
