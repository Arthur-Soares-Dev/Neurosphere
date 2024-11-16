import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles, { colors, sizeFonts } from '../../Styles/GlobalStyle';

const BaseTaskCard = ({
  task,
  isExpanded,
  onExpand,
  onSpeak,
  onEdit,
  onDelete,
  onFavorite,
  onConclude,
}) => {
  const startTime = new Date(task.startTime);
  const endTime = new Date(task.endTime);

  return (
    <TouchableOpacity
      style={[styles.taskContainer, isExpanded && styles.taskContainerExpanded]}
      onPress={onExpand}
    >
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{task.name.toUpperCase()}</Text>
        <TouchableOpacity onPress={onSpeak} style={[styles.iconWrapper, { marginRight: 120 }]}>
          <Ionicons name="volume-high" size={18} color={colors.PINK} />
        </TouchableOpacity>
        <Text style={[styles.taskDate]}>
          {new Date(task.date).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <Text style={styles.taskTime}>
        {startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} -{' '}
        {endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
      </Text>

      {!isExpanded && (
        <View style={styles.footer}>
            <TouchableOpacity onPress={onExpand} style={styles.iconWrapper}>
                <Ionicons name="chevron-down-outline" size={18} color={colors.PINK} />
            </TouchableOpacity>

          <TouchableOpacity onPress={onFavorite}>
            <Ionicons
              name={task.favorite ? 'star' : 'star-outline'}
              size={24}
              color={colors.YELLOW}
            />
          </TouchableOpacity>
          
        </View>
      )}

      {isExpanded && (
        <View style={styles.taskContent}>
          <Text style={styles.taskDescription}>{task.description}</Text>

          <View style={styles.taskButtons}>
            <TouchableOpacity onPress={onConclude} style={styles.taskButton}>
              <Text style={styles.taskButtonText}>Concluir</Text>
              <Ionicons name="checkmark-circle" size={16} color={colors.PINK} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onEdit} style={styles.taskButton}>
              <Text style={styles.taskButtonText}>Editar</Text>
              <Ionicons name="create" size={16} color={colors.PINK} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.taskButton}>
              <Text style={styles.taskButtonText}>Deletar</Text>
              <Ionicons name="trash" size={16} color={colors.PINK} />
            </TouchableOpacity>

            {/* Footer dentro do taskButtons */}
            <View style={styles.footerInButtons}>
             
              <TouchableOpacity onPress={onExpand} style={styles.iconWrapper}>
                <Ionicons name="chevron-up-outline" size={18} color={colors.PINK} />
              </TouchableOpacity>

              <TouchableOpacity onPress={onFavorite}>
                <Ionicons
                  name={task.favorite ? 'star' : 'star-outline'}
                  size={24}
                  color={colors.YELLOW}
                />

              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: colors.PINK,
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
    fontSize: sizeFonts.MEDIUM,
    fontFamily: 'MinhaFonte',
    color: colors.WHITE,
  },

  taskDate: {
    fontSize: sizeFonts.SMALL,
    color: colors.WHITE,
    fontFamily: 'MinhaFonte',
    marginTop: 10,
  },

  taskTime: {
    fontSize: sizeFonts.SMALL,
    color: colors.WHITE,
    marginTop: 5,
    fontFamily: 'MinhaFonte',
  },

  taskContent: {
    marginTop: 10,
  },

  taskDescription: {
    fontSize: sizeFonts.SMALL,
    color: colors.WHITE,
    marginBottom: 10,
    fontFamily: 'MinhaFonte',
  },

  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskButton: {
    backgroundColor: colors.WHITE,
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },

  taskButtonText: {
    color: colors.PINK,
    fontSize: 16,
    marginRight: 5,
    fontFamily: 'MinhaFonte',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },

  footerInButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  iconWrapper: {
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BaseTaskCard;
