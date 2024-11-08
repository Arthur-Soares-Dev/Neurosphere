// src/App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { TasksProvider } from './src/contexts/TasksContext';
import AuthStack from './src/AuthStack';
import { LoadingProvider } from './src/contexts/LoadingContext';
import Loading from './src/components/Loading';
import LaunchScreen from './src/Pages/LaunchScreen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

function App() {
    const [isLaunchVisible, setIsLaunchVisible] = useState(true);

    const [fontsLoaded] = useFonts({
        'MinhaFonte': require('./src/Asset/fonts/Candy Beans.otf'),
    });

    const hideLaunchScreen = () => {
        setIsLaunchVisible(false);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <LoadingProvider>
            <AuthProvider>
                <TasksProvider>
                    <NavigationContainer>
                        {isLaunchVisible && <LaunchScreen onHide={hideLaunchScreen} />}
                        {!isLaunchVisible && <AuthStack />}
                        <Loading />
                    </NavigationContainer>
                </TasksProvider>
            </AuthProvider>
            <StatusBar style="dark" translucent={true} backgroundColor="transparent" />
        </LoadingProvider>
    );
}

export default App;
