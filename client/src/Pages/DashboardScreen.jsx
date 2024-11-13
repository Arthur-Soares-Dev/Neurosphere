import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import TaskList from '../components/Dashboard/DashboardTasks';
import Card from '../components/Dashboard/DashboardCard';
import ButtonCards from '../components/Dashboard/DashboardCard/buttonCards';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import PinDialog from './PinDialog';
import BaseDashCard from '../components/BasesComponents/baseDashCard';
import { ScreenNames } from '../enums/ScreenNames';
import globalStyles, {colors, sizeFonts} from '../Styles/GlobalStyle';
import { ScrollView } from 'react-native-gesture-handler';


const DashboardScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);

  // Dados para os cards
  const dashCardsData = [
    { title: 'VER TAREFAS', icon: 'list-outline', screenName: ScreenNames.VIEW_TASKS },
    { title: 'PAINEL DE FRASES', icon: 'chatbubble-outline', screenName: ScreenNames.AUDIO_DIALOGUE },
    { title: 'JOGOS\n', icon: 'game-controller-outline', screenName: ScreenNames.GAMES_LIST },
  ];

  return (
    <SafeAreaView style={globalStyles.outerContainer}>

      <View style={[globalStyles.scrollContainer, { flexGrow: 0, paddingHorizontal: 15 }]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              OLÁ, {user?.name}!
            </Text>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setIsPinDialogOpen(true)}
            >
              <Image
                source={user?.profileImage ? { uri: user?.profileImage } : require('../../assets/default-avatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
      </View>

      <ScrollView contentContainerStyle={[globalStyles.scrollContainer, {paddingHorizontal: 15, paddingTop: 0}]}>

        <View style={globalStyles.container}>

          <Card />

          <View style={styles.menuContainer}>
            <Text style={[globalStyles.tittle, {marginBottom: 0, fontSize: sizeFonts.MEDIUM, color: colors.YELLOW}]}>ATALHOS DIÁRIOS</Text>
          </View>

          <FlatList
            data={dashCardsData}
            renderItem={({ item, index }) => (
              <BaseDashCard
                title={item.title}
                icon={item.icon}
                iconColor={colors.WHITE}
                navigation={navigation}
                screenName={item.screenName}
                index={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.cardList}
            showsHorizontalScrollIndicator={false}
          />

          {/* <TaskList /> */}

          <PinDialog
            isOpen={isPinDialogOpen}
            onClose={() => setIsPinDialogOpen(false)}
            navigation={navigation}
          />

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerText: {
    fontSize: sizeFonts.MEDIUM,
    fontFamily: 'MinhaFonte',
    color: colors.YELLOW
  },

  profileButton: {
    padding: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.YELLOW
  },

  cardList: {
    paddingTop: 20,
  },

  menuContainer: {
    width: '100%',
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
});
