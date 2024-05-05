import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Login from "./src/Login";
import Cadastro from "./src/Cadastro";
import Dashboard from "./src/Dashboard";

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
                screenOptions={{ headerShown: false }} // Tem configurar headerShown como false para cada tela no Stack.Navigator (Isso faz com que suma a Header Feia)

            >
                {!user ? (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            name="Cadastro"
                            component={Cadastro}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
