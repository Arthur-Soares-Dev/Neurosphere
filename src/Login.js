import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import Botao from './components/botao';
import Input from './components/input';
import { TextInput } from 'react-native-gesture-handler';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const loginUser = async (email, password) => {
        console.log("Email:" + email + ". Senha:" + password+".")
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Dashboard');
            setEmail('');
            setPassword('');
        } catch (error) {
            alert(error.message);
        }
    };  

    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("Email para troca de senha enviado");
            }).catch((error) => {
                alert("Digite seu email no campo acima");
            });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.outerContainer}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Olá!</Text>
                    <Text style={styles.subHeaderText}>Logar</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <View style={styles.inputContainer}>

                            <TextInput texto="Email" placeholder="Email"  onChangeText={(email) => setEmail(email)}  autoCapitalize="none" value={email}/>

                            <TextInput texto="Senha" placeholder="Senha"  onChangeText={(password) => setPassword(password)}  autoCapitalize="none"  secureTextEntry={true} value={password}/>

                        </View>

                        <TouchableOpacity onPress={forgetPassword} style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.separatorContainer}>
                            <View style={styles.separator} />
                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                                <Text style={styles.separatorText}>Não possui uma conta?</Text>
                            </TouchableOpacity>
                            <View style={styles.separator} />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.signInLinkContainer}>
                            <Text style={styles.signInLinkText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#ff5e78',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subHeaderText: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 30,
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#999',
        fontSize: 14,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
        justifyContent: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#353535',
        flex: 1,
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#353535',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInLinkContainer: {
        marginTop: 10,
    },
    signInLinkText: {
        color: '#FD7FAC',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
