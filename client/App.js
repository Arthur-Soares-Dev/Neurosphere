// src/App.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { TasksProvider } from './src/contexts/TasksContext';
import AuthStack from './src/AuthStack';
import { LoadingProvider } from './src/contexts/LoadingContext';
import Loading from './src/components/Loading';
import LaunchScreen from './src/Pages/LaunchScreen';

function App() {
    const [isLaunchVisible, setIsLaunchVisible] = useState(true); // Estado para controlar a visibilidade da LaunchScreen

    // Função para esconder a LaunchScreen
    const hideLaunchScreen = () => {
        setIsLaunchVisible(false);
    };

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
        </LoadingProvider>
    );
}

export default App;
