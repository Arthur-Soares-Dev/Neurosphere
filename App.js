import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Login from "./src/Login";
import Cadastro from "./src/Cadastro";
import Dashboard from "./src/Dashboard";
import MainMenu from "./src/MainMenu";

const Stack = createStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Lidar com alterações do estado do usuário.
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])
    if (initializing) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                {!user ? (
                    // Se o usuário não estiver logado, mostra a tela MainMenu
                    /*<Stack.Screen
                        name="MainMenu"
                        component={MainMenu}
                    />*/
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />

                ) : (
                    // Se o usuário estiver logado, mostra o painel do Dashboard
                    <Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                    />
                )}
                
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
