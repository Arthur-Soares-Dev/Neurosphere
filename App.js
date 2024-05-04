import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from "react";
import {firebase} from "./config";

import Login from "./src/Login";
import Cadastro from "./src/Cadastro";
import Dashboard from "./src/Dashboard";
import Header from "./components/Header";

const Stack = createStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Lidar com alterações de estado do usuário
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])
    if (initializing) return null;

    if (!user) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Login" 
                    component={Login}
                    options={{
                        headerTittle: () => <Header name="NeuroSphere"/>,
                        headerStyle: {
                            height: 150,
                            backgroundColor: '#FD7FAC',
                            shadowColor: '#000',
                            elevation: 25
                        }
                    }}
                    />
                <Stack.Screen
                    name="Cadastro" 
                    component={Cadastro}
                    options={{
                        headerTittle: () => <Header name="NeuroSphere"/>,
                        headerStyle: {
                            height: 150,
                            backgroundColor: '#FD7FAC',
                            shadowColor: '#000',
                            elevation: 25
                        }
                    }}
                    />
            </Stack.Navigator>
        );
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                    name="Tela inicial" 
                    component={Dashboard}
                    options={{
                        headerTittle: () => <Header name="Dashboard"/>,
                        headerStyle: {
                            height: 150,
                            backgroundColor: '#FD7FAC',
                            shadowColor: '#000',
                            elevation: 25
                        }
                    }}
                    />
        </Stack.Navigator>
    );
}

export default () => {
    return (
        <NavigationContainer>
            <App/>
        </NavigationContainer>
    )
} // Meu parabens caro leitor!