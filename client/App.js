import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import LoginScreen from "./src/Pages/LoginScreen";
import RegisterScreen from "./src/Pages/RegisterScreen";
import DashboardScreen from "./src/Pages/DashboardScreen";
import ViewTasksScreen from "./src/Pages/ViewTasksScreen";
import CreateTaskScreen from "./src/Pages/CreateTaskScreen";
import ProfileScreen from "./src/Pages/ProfileScreen";
import AudioDialogueScreen from "./src/Pages/AudioDialogueScreen";
import GamesListScreen from "./src/Pages/GamesListScreen"
import MathGameScreen from "./src/Pages/Games/MathGameScreen";
import WordGameScreen from "./src/Pages/Games/WordGameScreen";
import EmotionGameScreen from "./src/Pages/Games/EmotionGameScreen";
import ColorGameScreen from "./src/Pages/Games/ColorGameScreen";
import FeedbackListScreen from "./src/Pages/FeedbackListScreen";
import {AuthProvider} from "./src/contexts/AuthContext";
import {TasksProvider} from './src/contexts/TasksContext';
import {firebaseAuth} from "./src/firebase/firebaseServices";

const Stack = createStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
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
                        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        <Stack.Screen name="ViewTasksScreen" component={ViewTasksScreen} />
                        <Stack.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
                        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                        <Stack.Screen name="AudioDialogueScreen" component={AudioDialogueScreen} />
                        <Stack.Screen name="GamesListScreen" component={GamesListScreen} />
                        <Stack.Screen name="MathGameScreen" component={MathGameScreen} />
                        <Stack.Screen name="WordGameScreen" component={WordGameScreen} />
                        <Stack.Screen name="EmotionGameScreen" component={EmotionGameScreen} />
                        <Stack.Screen name="ColorGameScreen" component={ColorGameScreen} />
                        <Stack.Screen name="FeedbackListScreen" component={FeedbackListScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </TasksProvider>
        </AuthProvider>
    );
}

export default App;
