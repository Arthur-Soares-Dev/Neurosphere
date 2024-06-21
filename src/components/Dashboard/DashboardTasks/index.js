import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function Tasks() {
  return (
    <View style={{width: "95%", marginTop: 10}}>
        <View style={styles.menuContainer}>
            <Text style={{fontSize: 20}}>Tarefas Diárias</Text>
        </View>
        <View style={styles.card}>
            <ScrollView
            horizontal = {true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            >
                <TouchableOpacity style={styles.cardPink}> 
                <View style={styles.circle}>
                    <Text style={styles.textCircle}>
                        +
                    </Text>
                </View>
                <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
                    Adicionar Tarefa
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardPink}> 
                <View style={styles.circle}>
                    <Text style={styles.textCircle}>
                        +
                    </Text>
                </View>
                <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
                    Adicionar Tarefa
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardPink}> 
                <View style={styles.circle}>
                    <Text style={styles.textCircle}>
                        +
                    </Text>
                </View>
                <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
                    Adicionar Tarefa
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardPink}> 
                <View style={styles.circle}>
                    <Text style={styles.textCircle}>
                        +
                    </Text>
                </View>
                <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
                    Adicionar Tarefa
                </Text>
            </TouchableOpacity>
            </ScrollView>
            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    menuContainer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },

    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        marginBottom: 17,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    scrollContainer:{
        paddingLeft: 10,
        paddingRight: 10,
    },

    //Tá quebrado. Os cards não ocupam o tamanho inteiro do scroll. Concertar
    cardPink: {
        height: 100,
        borderRadius: 10,
        backgroundColor: '#FD7FAC',
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
});