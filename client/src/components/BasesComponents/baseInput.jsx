import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles, {colors} from '../../Styles/GlobalStyle';
import Ionicons from "@expo/vector-icons/Ionicons";
import Utils from "../../utils/Utils";

const StyledInput = ({style = [], ...props}) => {

    const {
        filled,
        variant,
        value,
        onChangeText,
        maxLength
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const inputStyles = [globalStyles.inputText];
    const viewStyles = [globalStyles.input];

    if (filled) {
        inputStyles.push(globalStyles.filledInputText);
        viewStyles.push(globalStyles.filledInput);
    }

    return (
        <View style={viewStyles}>
            <TextInput
                style={[...inputStyles, ...(Array.isArray(style) ? style : [style])]}
                secureTextEntry={variant === 'password' ? !showPassword : false}
                value={value} // controle do valor
                onChangeText={onChangeText} // função de atualização do texto
                {...props}
            />
            {(value && variant === 'email') && (
                <Ionicons
                    name={Utils.validateEmail(value) ? "checkmark-circle" : "close-circle"}
                    size={24}
                    color={Utils.validateEmail(value) ? colors.BLUE : colors.BLUE}
                    style={styles.inputIcon}
                />
            )}
            {variant === 'password' && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "eye" : "eye-off"}
                        size={24}
                        color={filled ? colors.WHITE : colors.BLUE}
                        style={styles.inputIcon}
                    />
                </TouchableOpacity>
            )}
            { maxLength &&
             <Text style={styles.characterCount}>{value.length}/{maxLength}</Text>
            }
        </View>
    );
};

export default StyledInput;

const styles = StyleSheet.create({
    inputIcon: {
        marginLeft: 10,
    },

    characterCount: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        color: '#353535',
        fontSize: 12,
    },

});