// src/components/LaunchScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLoading } from '../contexts/LoadingContext';

const LaunchScreen = ({ onHide }) => {
    const { isLoading } = useLoading();
    const launchDuration = 10;
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoading) {
                setIsVisible(false);
            }
        }, launchDuration);

        return () => clearTimeout(timer);
    }, [isLoading, launchDuration]);

    useEffect(() => {
        if (!isVisible) {
            onHide();
        }
    }, [isVisible, onHide]);

    if (!isVisible) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo ao Aplicativo!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default LaunchScreen;
