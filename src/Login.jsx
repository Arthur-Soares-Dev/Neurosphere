import React, {useEffect, useState} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useAuth} from './contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const [error, setError] = useState();
    const isFirstRender = React.useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        alert(error);
    }, [error]);

    const validateEmail = (email) => {
        // Expressão regular simples para validação de email
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = async (email, password) => {
        console.log('handleLogin', email, password)
        try {
          await login(email, password);
            navigation.navigate('Dashboard');
        } catch (error) {
          setError(error.message);
        }
    };

    const handleForgetPassword = async () => {
        try {
            await forgetPassword(email);
            alert("Email para troca de senha enviado");
        } catch (error) {
            setError(error.message);
        }
        
    };

    const { login, forgetPassword } = useAuth();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.outerContainer}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image
                        style={styles.profileImage}
                    />
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor="rgba(53,53,53,.6)"
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                        />
                        {email.length > 0 && (
                            <Ionicons 
                                name={validateEmail(email) ? "checkmark-circle" : "close-circle"} 
                                size={24} 
                                color={validateEmail(email) ? "gray" : "gray"} 
                                style={styles.inputIcon} 
                            />
                        )}
                    </View>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Senha"
                            placeholderTextColor="rgba(53,53,53,.6)"
                            onChangeText={(password) => setPassword(password)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={!showPassword}
                            value={password}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons 
                                name={showPassword ? "eye" : "eye-off"} 
                                size={24} 
                                color="gray" 
                                style={styles.inputIcon} 
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleForgetPassword} style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => handleLogin(email, password)}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Logar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleLogin('12201839@aluno.cotemig.com.br', 'senha123')}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Login Rápido</Text>
                    </TouchableOpacity>

                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={30} color="#FD7FAC" />
                            <Text style={styles.signUpText}> Logar com o <Text style={styles.signUpLink}>Google</Text> ?</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-facebook" size={30} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={30} color="#7C9DD9" />
                        </TouchableOpacity> */}
                    </View>
                    
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Não possui uma conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                            <Text style={styles.signUpLink}>Cadastrar</Text>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    container: {
        flex: 1,
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 0, 
        paddingTop: 30,
    },
    profileImage: {
        width: 180, 
        height: 180,
        borderRadius: 90,
        backgroundColor: '#E0E0E0',
        marginBottom: 40, 
    },
    label: {
        alignSelf: 'flex-start',
        color: '#FD7FAC',
        fontSize: 18, 
        marginBottom: 10, 
    },
    inputWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30, 
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
        paddingHorizontal: 10, 
    },
    textInput: {
        flex: 1,
        fontSize: 18, 
        paddingVertical: 15, 
    },
    inputIcon: {
        marginLeft: 10, 
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 40, 
    },
    forgotPasswordText: {
        color: '#999',
        fontSize: 16, 
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#7C9DD9',
        padding: 20, 
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 40, 
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 20, 
        fontWeight: 'bold',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 40, 
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        padding: 15,
        paddingRight: 83, 
        borderRadius: 12,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpText: {
        color: '#353535',
        fontSize: 16, 
    },
    signUpLink: {
        color: '#FD7FAC',
        fontSize: 16,
        marginLeft: 5,
    }
});
