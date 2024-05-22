import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const CustomCheckbox = ({ isChecked, onPress }) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
            <View style={[styles.checkbox, isChecked && styles.checked]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#000',
    },
});

export default CustomCheckbox;
