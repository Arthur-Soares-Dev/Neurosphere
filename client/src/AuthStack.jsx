import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/AuthContext";
import LoginScreen from "./Pages/LoginScreen";
import RegisterScreen from "./Pages/RegisterScreen";
import DashboardScreen from "./Pages/DashboardScreen";
import ViewTasksScreen from "./Pages/ViewTasksScreen";
import CreateTaskScreen from "./Pages/CreateTaskScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import AudioDialogueScreen from "./Pages/AudioDialogueScreen";
import GamesListScreen from "./Pages/GamesListScreen";
import MathGameScreen from "./Pages/Games/MathGameScreen";
import WordGameScreen from "./Pages/Games/WordGameScreen";
import EmotionGameScreen from "./Pages/Games/EmotionGameScreen";
import ColorGameScreen from "./Pages/Games/ColorGameScreen";
import FeedbackListScreen from "./Pages/FeedbackListScreen";
import { ScreenNames } from "./enums/ScreenNames";
import LandingScreen from "./Pages/LandingScreen";
import EditProfileScreen from './Pages/EditProfileScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={user ? ScreenNames.DASHBOARD : ScreenNames.LANDING}
        >
            {user ? (
                <>
                    <Stack.Screen name={ScreenNames.DASHBOARD} component={DashboardScreen} />
                    <Stack.Screen name={ScreenNames.VIEW_TASKS} component={ViewTasksScreen} />
                    <Stack.Screen name={ScreenNames.CREATE_TASK} component={CreateTaskScreen} />
                    <Stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
                    <Stack.Screen name={ScreenNames.EDIT_PROFILE} component={EditProfileScreen} />
                    <Stack.Screen name={ScreenNames.AUDIO_DIALOGUE} component={AudioDialogueScreen} />
                    <Stack.Screen name={ScreenNames.GAMES_LIST} component={GamesListScreen} />
                    <Stack.Screen name={ScreenNames.MATH_GAME} component={MathGameScreen} />
                    <Stack.Screen name={ScreenNames.WORD_GAME} component={WordGameScreen} />
                    <Stack.Screen name={ScreenNames.EMOTION_GAME} component={EmotionGameScreen} />
                    <Stack.Screen name={ScreenNames.COLOR_GAME} component={ColorGameScreen} />
                    <Stack.Screen name={ScreenNames.FEEDBACK_LIST} component={FeedbackListScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
                    <Stack.Screen name={ScreenNames.REGISTER} component={RegisterScreen} />
                    <Stack.Screen name={ScreenNames.LANDING} component={LandingScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default AuthStack;
