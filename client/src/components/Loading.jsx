import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLoading } from '../contexts/LoadingContext';

const Loading = () => {
    const { isLoading } = useLoading();
    console.log('LoadingScreen');

    if (!isLoading) {
        console.log('!isLoading');
        return null;
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#ffffff', // Cor do texto
    },
});

export default Loading;
