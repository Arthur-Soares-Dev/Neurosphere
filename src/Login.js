// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { firebase } from '../config';
// import StyleBotao from './components/Styles/botao';
// import StyleInput from './components/Styles/input';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigation = useNavigation();

//     const loginUser = async (email, password) => {
//         try {
//             await firebase.auth().signInWithEmailAndPassword(email, password);
//             navigation.navigate('Dashboard');
//             setEmail('');
//             setPassword('');
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     const forgetPassword = () => {
//         firebase.auth().sendPasswordResetEmail(email)
//             .then(() => {
//                 alert("Email para troca de senha enviado");
//             }).catch((error) => {
//                 alert("Digite seu email no campo acima");
//             });
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             style={styles.outerContainer}
//         >
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.headerContainer}>
//                     <Text style={styles.headerText}>Olá!</Text>
//                     <Text style={styles.subHeaderText}>Logar</Text>
//                 </View>
//                 <View style={styles.container}>
//                     <View style={styles.innerContainer}>
//                         <View style={styles.inputContainer}>

//                         <Text style={StyleInput.inputTitle}>Email</Text>
//                         <View style={StyleInput.inputWrapper}>
//                         <TextInput
//                             style={StyleInput.textInput}
//                             placeholder="Email"
//                             placeholderTextColor="rgba(53,53,53,.6)"
//                             onChangeText={(email) => setEmail(email)}
//                             autoCapitalize="none"
//                             autoCorrect={false}
//                             value={email}
//                         />
//                     </View>
            
//                     <Text style={StyleInput.inputTitle}>Senha</Text>
//                     <View style={StyleInput.inputWrapper}>
//                         <TextInput
//                             style={StyleInput.textInput}
//                             placeholder="Senha"
//                             placeholderTextColor="rgba(53,53,53,.6)"
//                             onChangeText={(password) => setPassword(password)}
//                             autoCapitalize="none"
//                             autoCorrect={false}
//                             secureTextEntry={true}
//                             value={password}
//                         />
//                     </View> 
//                         </View>

//                         <TouchableOpacity onPress={forgetPassword} style={styles.forgotPasswordContainer}>
//                             <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             onPress={() => loginUser(email, password)}
//                             style={StyleBotao.button}
//                             >
//                             <Text style={StyleBotao.buttonText}>Login</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             onPress={() => loginUser('12201839@aluno.cotemig.com.br', 'senha123')}
//                             style={StyleBotao.button}
//                             >
//                             <Text style={StyleBotao.buttonText}>Login Rápido</Text>
//                         </TouchableOpacity>

                        

//                         <View style={styles.separatorContainer}>
//                             <View style={styles.separator} />
//                             <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
//                                 <Text style={styles.separatorText}>Não possui uma conta?</Text>
//                             </TouchableOpacity>
//                             <View style={styles.separator} />
//                         </View>

//                         <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.signInLinkContainer}>
//                             <Text style={styles.signInLinkText}>Cadastrar</Text>
//                         </TouchableOpacity>
                        
//                     </View>
//                 </View>
//             </ScrollView>
//         </KeyboardAvoidingView>
//     );
// };

// export default Login;

// const styles = StyleSheet.create({
//     outerContainer: {
//         flex: 1,
//         backgroundColor: '#ff5e78',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//     },
//     headerContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: 30,
//     },
//     headerText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: 10,
//     },
//     subHeaderText: {
//         fontSize: 24,
//         color: '#fff',
//         marginBottom: 30,
//     },
//     container: {
//         flex: 1,
//         width: '100%',
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 50,
//         borderTopRightRadius: 50,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     innerContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//         paddingVertical: 50,
//     },
//     inputContainer: {
//         width: '100%',
//         marginBottom: 20,
//     },
//     forgotPasswordContainer: {
//         alignSelf: 'flex-end',
//         marginBottom: 20,
//     },
//     forgotPasswordText: {
//         color: '#999',
//         fontSize: 14,
//     },
//     separatorContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 20,
//         width: '100%',
//         justifyContent: 'center',
//     },
//     separator: {
//         height: 1,
//         backgroundColor: '#353535',
//         flex: 1,
//     },
//     separatorText: {
//         marginHorizontal: 10,
//         color: '#353535',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     signInLinkContainer: {
//         marginTop: 10,
//     },
//     signInLinkText: {
//         color: '#FD7FAC',
//         fontSize: 16,
//         fontWeight: 'bold',
//     }
// });
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import Ionicons from '@expo/vector-icons/Ionicons'; // Nova importação

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
                        <Ionicons name="checkmark-circle" size={30} color="gray" style={styles.inputIcon} />
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
                            secureTextEntry={true}
                            value={password}
                        />
                        <Ionicons name="eye-off" size={30} color="gray" style={styles.inputIcon} />
                    </View>

                    <TouchableOpacity onPress={forgetPassword} style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => loginUser(email, password)}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Logar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => loginUser('12201839@aluno.cotemig.com.br', 'senha123')}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Login Rápido</Text>
                    </TouchableOpacity>

                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={30} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-facebook" size={30} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={30} color="gray" />
                        </TouchableOpacity>
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
        paddingTop: 30
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
        backgroundColor: '#f4f4f4',
        padding: 15, 
        borderRadius: 12,
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

