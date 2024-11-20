import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import globalStyles, { colors, sizeFonts } from '../Styles/GlobalStyle';

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
        selectedDayBackgroundColor: colors.PINK,
        todayTextColor: colors.PINK,
        dayTextColor: 'black',
        textDisabledColor: 'grey',
        monthTextColor: 'black',
        indicatorColor: 'blue',
        textDayFontFamily: 'MinhaFonte',
        textMonthFontFamily: 'MinhaFonte',
        textDayHeaderFontFamily: 'MinhaFonte',
        textDayFontSize: sizeFonts.SMALL,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 16,
      }}
      markedDates={markedDates}
    />
  );
};

export default MyCalendar;