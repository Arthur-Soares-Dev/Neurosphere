import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";


import Login from "./src/Login";
import Cadastro from "./src/Cadastro";
import Dashboard from "./src/Dashboard";
import TelaDasCrianca from "./src/TelaDasCrianca";
import TelaDosPais from "./src/TelaDosPais";
import Profile from "./src/Profile";
import AudioDialogue from "./src/AudioDialogue";
import Game from "./src/Game"
import MathGame from "./src/components/Games/MathGame";
import WordGame from "./src/components/Games/WordGame";
import { AuthProvider } from "./src/contexts/AuthContext";
import { TasksProvider } from './src/contexts/TasksContext';

const Stack = createStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    
    if (initializing) return null;

    return (
        <AuthProvider>
            <TasksProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName={user ? "Dashboard" : "Login"}
                    >
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Cadastro" component={Cadastro} />
                        <Stack.Screen name="TelaDasCrianca" component={TelaDasCrianca} />
                        <Stack.Screen name="TelaDosPais" component={TelaDosPais} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="AudioDialogue" component={AudioDialogue} />
                        <Stack.Screen name="Game" component={Game} />
                        <Stack.Screen name="MathGame" component={MathGame} />
                        <Stack.Screen name="WordGame" component={WordGame} />
                    </Stack.Navigator>
                </NavigationContainer>
            </TasksProvider>
        </AuthProvider>
    );
}

export default App;
