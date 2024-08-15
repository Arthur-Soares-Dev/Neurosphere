import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { firebase } from '../config';

const CalendarView = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) {
          console.error('Usuário não autenticado');
          return;
        }

        const tasksSnapshot = await firebase.firestore()
          .collection('users')
          .doc(user.uid)
          .collection('Tasks')
          .get();

        const tasksData = {};
        tasksSnapshot.forEach(doc => {
          const task = doc.data();
          console.log('Dados da tarefa:', task);
          let date;
          if (task.date && task.date.toDate) {
            date = task.date.toDate().toISOString().split('T')[0];
          } else if (typeof task.date === 'string') {
            date = new Date(task.date).toISOString().split('T')[0];
          } else {
            console.warn(`Formato de data incorreto: ${task.date}`);
            return;
          }

          if (!tasksData[date]) {
            tasksData[date] = [];
          }
          tasksData[date].push({
            name: task.name,
            description: task.description,
            startTime: task.startTime,
            endTime: task.endTime,
          });
        });

        setTasks(tasksData);
        setTasksForSelectedDate(tasksData[selectedDate] || []);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  const updateTasksForDate = (date) => {
    setSelectedDate(date);
    setTasksForSelectedDate(tasks[date] || []);
  };

  const renderMarkedDates = () => {
    const markedDates = Object.keys(tasks).reduce((acc, date) => {
      acc[date] = {
        marked: true,
        dotColor: 'red',
        activeOpacity: 0.5,
      };
      return acc;
    }, {});

    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
    };

    return markedDates;
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.name}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskTime}>{new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
    </View>
  );

  // Função para formatar a data no formato DD/MM/YYYY
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={renderMarkedDates()}
        markingType={'dot'}
        onDayPress={(day) => updateTasksForDate(day.dateString)}
        current={selectedDate}
      />
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>Tarefas para {formatDate(selectedDate)}</Text>
        <FlatList
          data={tasksForSelectedDate}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTaskItem}
          ListEmptyComponent={<Text>Sem tarefas para essa data.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  tasksContainer: {
    marginTop: 20,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
  },
  taskTime: {
    fontSize: 12,
    color: 'gray',
  },
});

export default CalendarView;
