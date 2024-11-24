import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTasks } from '../contexts/TasksContext';
import MyCalendar from "../components/MyCalendar";
import DialogTask from "../components/DialogTask";
import { ScreenNames } from "../enums/ScreenNames";
import GoBackButton from '../components/GoBackButton';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';
import StyledButton from "../components/BasesComponents/baseButton";
import BaseTaskCard from '../components/BasesComponents/baseTaskCard';
import PinDialog from "./PinDialog";

const ViewTasksScreen = ({ navigation }) => {
  const { tasks, toggleCompleted, favoriteTask, deleteTask, speakTask } = useTasks();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const [onPass, setOnPass] = useState('asd');
  const [item, setItem] = useState(null);

  const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleCalendarChange = (day) => {
    setSelectedDay(new Date(day.year, day.month - 1, day.day));
    setShowCalendar(false);
  };

  const filteredAndSortedTasks = tasks
    .filter(task => !task.completed && new Date(task.date).toDateString() === selectedDay.toDateString())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const parseCustomDate = (dateString) => {
    if (dateString._seconds && dateString._nanoseconds) {
      const seconds = dateString._seconds;
      const nanoseconds = dateString._nanoseconds;
      return new Date(seconds * 1000 + Math.floor(nanoseconds / 1000000));
    }
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const markedDates = tasks.reduce((acc, task) => {
    const taskDate = parseCustomDate(task.date);
    if (taskDate && !task.completed) {
      const date = taskDate.toISOString().split('T')[0];
      acc[date] = { marked: true };
    }
    return acc;
  }, {});

  const handleConcludeTask = (taskId) => {
    setSelectedTaskId(taskId);
    setDialogVisible(true);
  };

  const handleExpandTask = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  function onEdit(item) {
    navigation.navigate(ScreenNames.CREATE_TASK, { task: item })
  }
  function onDelete(item) {
    deleteTask(item.id)
  }

  const renderItem = ({ item, index }) => {
    return (
      <BaseTaskCard
        task={item}
        isExpanded={expandedTaskId === item.id}
        onExpand={() => handleExpandTask(item.id)}
        onConclude={() => handleConcludeTask(item.id)}
        // onEdit={() => navigation.navigate(ScreenNames.CREATE_TASK, { task: item })}
        // onDelete={() => deleteTask(item.id)}
        onEdit={() => {
          setOnPass(() => (item) => onEdit(item))
          setItem(item)
          setIsPinDialogOpen(true)
        }}
        onDelete={() => {
          setOnPass(() => (item) => onDelete(item))
          setItem(item)
          setIsPinDialogOpen(true)
        }}
        onFavorite={() => favoriteTask(item.id)}
        onSpeak={() => speakTask(item.name, item.description)}
        index={index}
      />
    );
  };

  return (
    <SafeAreaView style={globalStyles.outerContainer}>
      <View style={[globalStyles.scrollContainer, { flexGrow: 0, paddingHorizontal: 15 }]}>
        <GoBackButton title={"TAREFAS"} />
        <View style={styles.header}>
          {Array.from({ length: 4 }, (_, i) => {
            const day = new Date(selectedDay);
            day.setDate(selectedDay.getDate() + i - 1);
            const isSelected = day.toDateString() === selectedDay.toDateString();
            return (
              <TouchableOpacity
                key={i}
                onPress={() => handleDayChange(day)}
                style={[
                  styles.dayButton,
                  isSelected && { backgroundColor: colors.BLUE }
                ]}
              >
                <View>
                  <Text style={styles.dayOfWeekText}>{daysOfWeek[day.getDay()]}</Text>
                  <Text style={styles.dayNumberText}>{day.getDate()}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            onPress={() => setShowCalendar(true)}
            style={[
              styles.dayButton,
              { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PURPLE }
            ]}
          >
            <Ionicons name="calendar-outline" size={30} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>

      {showCalendar && (
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarDialog}>
            <MyCalendar
              onDayChange={handleCalendarChange}
              markedDates={markedDates}
            />
            <StyledButton
              title="FECHAR"
              onPress={() => setShowCalendar(false)}
              style={{ marginTop: 10 }}
            />
          </View>
        </View>
      )}

      <Text style={[globalStyles.tittle, { textAlign: 'center', fontSize: sizeFonts.MEDIUM }]}>
        TAREFAS DO DIA - {selectedDay.toLocaleDateString('pt-BR')}
      </Text>

      <FlatList
        data={filteredAndSortedTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={[styles.list, showCalendar && styles.listDisabled]}
        contentContainerStyle={styles.listContainer}
      />

      <DialogTask
        isOpen={dialogVisible}
        onClose={() => setDialogVisible(false)}
        taskId={selectedTaskId}
      />

      <PinDialog
          isOpen={isPinDialogOpen}
          onClose={() => setIsPinDialogOpen(false)}
          navigation={navigation}
          onPass={onPass}
          item={item}
      />

    </SafeAreaView>
  );
};

export default ViewTasksScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  dayButton: {
    width: "20%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.PINK,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayOfWeekText: {
    fontSize: sizeFonts.SMALL,
    color: colors.WHITE,
    fontFamily: 'MinhaFonte',
    textAlign: 'center',
  },

  dayNumberText: {
    fontSize: sizeFonts.SMALL,
    color: colors.WHITE,
    fontFamily: 'MinhaFonte',
    textAlign: 'center',
    marginTop: 2,
  },

  list: {
    paddingHorizontal: 15,
  },

  listDisabled: {
    opacity: 0.5,
  },

  calendarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },

  calendarDialog: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 10,
  },
});
