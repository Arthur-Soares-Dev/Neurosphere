import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
    const loginUser = async (email, password) => {
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
        <View style={styles.outerContainer}>
            <Text style={styles.headerText}>Hello!</Text>
            <Text style={styles.subHeaderText}>Sign Up</Text>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Email</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                        />
                    </View>
                    <Text style={styles.inputTitle}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            onChangeText={(password) => setPassword(password)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={password}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={forgetPassword} style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={styles.separatorText}>Don't have an account?</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.signInLinkContainer}>
                    <Text style={styles.signInLinkText}>Sign In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#ff5e78',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        marginTop: 50,
    },
    subHeaderText: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
        width: '100%',
        paddingBottom: 30, 
        marginTop: 50,  
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        height: 50,
        color: '#000',
        paddingHorizontal: 10,
    },
    inputTitle: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff5e78', 
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#999',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#87cefa',
        paddingVertical: 15,
        paddingHorizontal: 90,
        borderRadius: 25,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
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
        backgroundColor: '#000',
        flex: 1,
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInLinkContainer: {
        marginTop: 10,
    },
    signInLinkText: {
        color: '#ff5e78',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
