import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.menuContainer}>
            <Text style={{fontSize: 20}}>Atalhos Diários</Text>
            <TouchableOpacity style={{fontSize: 15, color: '#353535'}}>
                <Text>Ver Todos</Text>
            </TouchableOpacity>
        </View>

        <ScrollView
        horizontal={true}  
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        style={{height: 150}}
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

            <TouchableOpacity style={styles.cardBlue}> 
                <View style={styles.square}> 
                    
                </View>
                <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
                    Ver {"\n"} Tarefas
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}> 
                <View style={styles.circle}>
                    <Text style={{ color: "#FD7FAC", fontSize: 40, marginTop: -6, }}>
                        
                    </Text>
                </View>
                <Text style={{ color: "white", fontSize: 14, textAlign: 'center' }}>
                    Painel de Frases
                </Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 200
    },

    menuContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },

    scrollview: {
        
    },

    scrollContainer: {
        height: 150,
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent:'space-between',
    },

    card: {
        width: 125,
        height: 150,
        borderRadius: 10,
        backgroundColor: '#353535',
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },

    cardPink: {
        width: 125,
        height: 150,
        borderRadius: 10,
        backgroundColor: '#FD7FAC',
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },

    cardBlue: {
        width: 125,
        height: 150,
        borderRadius: 10,
        backgroundColor: '#7FACD6',
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },

    circle:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    textCircle: { 
        position: 'absolute',
        color: "#FD7FAC", 
        fontSize: 40, 
        textAlign: 'center' 
    },

    square:{
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
  });