import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import PinDialog from './PinDialog';
import BaseDashCard from '../components/BasesComponents/baseDashCard';
import { ScreenNames } from '../enums/ScreenNames';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import BaseTaskCard from '../components/BasesComponents/baseTaskCard';
import { useTasks } from '../contexts/TasksContext';
import DialogTask from "../components/DialogTask";
import Card from '../components/Dashboard';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const { tasks, deleteTask, favoriteTask, speakTask, toggleCompleted } = useTasks(); // Pegando o contexto de tarefas
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleExpandTask = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleConcludeTask = (taskId) => {
    setSelectedTaskId(taskId);
    setDialogVisible(true);
    toggleCompleted(taskId); // Marca a tarefa como concluída
  };

  // Dados para os cards
  const dashCardsData = [
    { title: 'VER TAREFAS', icon: 'list-outline', screenName: ScreenNames.VIEW_TASKS },
    { title: 'PAINEL DE FRASES', icon: 'chatbubble-outline', screenName: ScreenNames.AUDIO_DIALOGUE },
    { title: 'JOGOS\n', icon: 'game-controller-outline', screenName: ScreenNames.GAMES_LIST },
  ];

  // Filtra tarefas favoritas e não concluídas
  const filteredTasks = tasks.filter(task => task.favorite && !task.completed);

  return (
    <SafeAreaView style={globalStyles.outerContainer}>

        <View style={[globalStyles.scrollContainer, { flexGrow: 0, paddingHorizontal: 15 }]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>OLÁ, {user?.name}!</Text>
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

        <ScrollView contentContainerStyle={[globalStyles.scrollContainer, { paddingHorizontal: 15, paddingTop: 0 }]}>
          <View style={globalStyles.container}>
            <Card />
            <View style={styles.menuContainer}>
              <Text style={[globalStyles.tittle, { marginBottom: 0, fontSize: sizeFonts.MEDIUM, color: colors.YELLOW }]}>
                ATALHOS DIÁRIOS
              </Text>
            </View>

            <View>
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
                style={{ marginBottom: 30 }}
              />
            </View>

            <View style={styles.menuContainer}>
              <Text style={[globalStyles.tittle, { marginBottom: 0, fontSize: sizeFonts.MEDIUM, color: colors.YELLOW }]}>
                TAREFAS FAVORITADAS
              </Text>
            </View>

            <FlatList
              data={filteredTasks} 
              renderItem={({ item, index }) => (
                <BaseTaskCard
                  task={item}
                  isExpanded={expandedTaskId === item.id}
                  onExpand={() => handleExpandTask(item.id)}
                  onConclude={() => handleConcludeTask(item.id)}
                  onEdit={() => navigation.navigate(ScreenNames.CREATE_TASK, { task: item })}
                  onDelete={() => deleteTask(item.id)}
                  onFavorite={() => favoriteTask(item.id)}
                  onSpeak={() => speakTask(item.name, item.description)}
                  index={index}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={[globalStyles.tittle, {textAlign: 'center', marginTop: 10}]}>NENHUMA TAREFA FAVORITADA AINDA</Text>
              }
              style={{ marginBottom: 30 }}
            />

            <PinDialog
              isOpen={isPinDialogOpen}
              onClose={() => setIsPinDialogOpen(false)}
              navigation={navigation}
            />

            <DialogTask
              isOpen={dialogVisible}
              onClose={() => setDialogVisible(false)}
              taskId={selectedTaskId}
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
    color: colors.YELLOW,
  },

  profileButton: {
    padding: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.YELLOW,
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
