import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTasks } from '../contexts/TasksContext';
import MyCalendar from "../components/MyCalendar";
import DialogTask from "../components/DialogTask";

const ViewTasksScreen = ({ navigation }) => {
  const { tasks, toggleCompleted, favoriteTask, deleteTask, speakTask } = useTasks();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false); // Estado para controlar o diálogo
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Para armazenar o ID da tarefa selecionada


  const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleCalendarChange = (day) => {
    setSelectedDay(new Date(day.year, day.month - 1, day.day));
    setShowCalendar(false);
  };

  const hasTasksForDay = (day) => {
    return tasks.some(task => new Date(task.date).toDateString() === day.toDateString() && task.completed === false);
  };

  const handleExpandTask = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const filteredAndSortedTasks = tasks
    .filter(task => !task.completed && new Date(task.date).toDateString() === selectedDay.toDateString())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Ordena pelo horário de início

  const parseCustomDate = (dateString) => {
    console.log('dateString', dateString);

    // Se dateString for um objeto com segundos e nanossegundos
    if (dateString._seconds && dateString._nanoseconds) {
      const seconds = dateString._seconds;
      const nanoseconds = dateString._nanoseconds;

      // Criar um novo objeto Date
      return new Date(seconds * 1000 + Math.floor(nanoseconds / 1000000)); // Convertendo para milissegundos
    }

    // Se dateString for uma string, converta normalmente
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date; // Retornar null se a data não for válida
  };


  const markedDates = tasks.reduce((acc, task) => {
    const taskDate = parseCustomDate(task.date);
    if (taskDate && !task.completed) {
      const date = taskDate.toISOString().split('T')[0]; // Converte a data para o formato YYYY-MM-DD
      acc[date] = { marked: true }; // Marca a data
    }
    return acc;
  }, {});


  const renderItem = ({ item }) => {
    const isExpanded = item.id === expandedTaskId;

    // Converter as datas de início e fim para objetos Date
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);

    return (
      <View style={[styles.taskContainer, isExpanded && styles.taskContainerExpanded]}>
        <TouchableOpacity onPress={() => handleExpandTask(item.id)} style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{item.name.toUpperCase()}</Text>
          <TouchableOpacity onPress={() => speakTask(item.name, item.description)}>
            <Ionicons name="volume-high-outline" size={18} color="white" />
          </TouchableOpacity>
          <Text style={styles.taskDate}>
            Início: {startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            {' - '}
            Fim: {endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Ionicons
            name={item.favorite ? "star" : "star-outline"}
            size={18}
            color="white"
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.taskContent}>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <View style={styles.taskButtons}>
              <TouchableOpacity onPress={() => {
                setSelectedTaskId(item.id);
                setDialogVisible(true);
              }} style={styles.taskButton}>
                <Text style={styles.taskButtonText}>Concluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CreateTaskScreen', { task: item })} style={styles.taskButton}>
                <Ionicons name="create-outline" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.taskButton}>
                <Ionicons name="trash-outline" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => favoriteTask(item.id)} style={styles.taskButton}>
                <Ionicons name={item.favorite ? "star" : "star-outline"} size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        {Array.from({ length: 4 }, (_, i) => {
          const day = new Date(selectedDay);
          day.setDate(selectedDay.getDate() + i - 1);
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleDayChange(day)}
              style={[styles.dayButton]}
            >
              <Text style={[styles.dayButtonText]}>
                {day.getDate()} {daysOfWeek[day.getDay()]}
              </Text>
              {hasTasksForDay(day) && <Ionicons name="checkmark-circle" size={16} color="green" style={styles.taskIndicator} />}
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.dayButton}>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showCalendar && (
        <View style={styles.calendarDialog}>
          <MyCalendar
            onDayChange={handleCalendarChange}
            markedDates={markedDates}
          />
          <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.dateText}>{selectedDay.toLocaleDateString('pt-BR')}</Text>

      <FlatList
        data={filteredAndSortedTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={[styles.list, showCalendar && styles.listDisabled]} // Adicionando estilo para desabilitar a lista quando o calendário está aberto
        contentContainerStyle={styles.listContainer}
      />
      <DialogTask
        isOpen={dialogVisible}
        onClose={() => setDialogVisible(false)}
        taskId={selectedTaskId}
      />
    </SafeAreaView>
  );
};

export default ViewTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
  },
  backButton: {
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  dayButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 5,
    elevation: 2,
  },
  dayButtonWithTasks: {
    backgroundColor: '#E8F5E9',
  },
  dayButtonSelected: {
    backgroundColor: '#FF6B6B',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  dayButtonTextSelected: {
    color: 'white',
  },
  taskIndicator: {
    marginLeft: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A4A4A',
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  listDisabled: {
    opacity: 0.5, // Tornar a lista opaca para indicar que está desabilitada
  },
  taskContainer: {
    backgroundColor: '#6B5B95',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  taskContainerExpanded: {
    paddingBottom: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  taskDate: {
    fontSize: 12,
    color: 'white',
  },
  favoriteIcon: {
    marginLeft: 10,
  },
  taskContent: {
    marginTop: 10,
  },
  taskDescription: {
    fontSize: 12,
    color: 'white',
    marginBottom: 10,
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskButton: {
    backgroundColor: '#FF6B6B',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  taskButtonText: {
    color: 'white',
    fontSize: 12,
    marginRight: 5,
  },
  calendarDialog: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
