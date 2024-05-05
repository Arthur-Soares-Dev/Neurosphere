import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const MainMenu = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Cadastro"
                onPress={() => navigation.navigate('Cadastro')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainMenu;
