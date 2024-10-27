import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const ptBR = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
  today: "Hoje",
};

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const MyCalendar = ({ onDayChange, markedDates }) => {
  return (
    <Calendar
      onDayPress={day => {
        onDayChange(day);
      }}
      style={{ backgroundColor: 'white' }}
      theme={{
        backgroundColor: 'white',
        calendarBackground: 'white',
        textSectionTitleColor: 'black',
        selectedDayBackgroundColor: '#FF6B6B',
        todayTextColor: '#FF6B6B',
        dayTextColor: 'black',
        textDisabledColor: 'grey',
        monthTextColor: 'black',
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: 'bold',
        textMonthFontWeight: 'bold',
        textDayFontSize: 16,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 14,
      }}
      markedDates={markedDates}
    />
  );
};

export default MyCalendar;