import React from 'react'
import{ View, Text, TextInput, StyleSheet } from "react-native"

const Input = ({texto, placeholder}) => {
        return(
            <View>
                <Text style={styles.inputTitle}>{texto}</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={placeholder}
                            placeholderTextColor="rgba(53,53,53,.6)"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
            </View>
        );
}

export default Input

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(53,53,53,.08)',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: 'rgba(53,53,53,.08)',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        height: 50,
        color: '#353535',
        paddingHorizontal: 10,
    },
    inputTitle: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FD7FAC',
    }
})