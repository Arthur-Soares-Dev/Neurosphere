import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles, {colors} from '../../Styles/GlobalStyle';
import Ionicons from "@expo/vector-icons/Ionicons";
import Utils from "../../utils/Utils";

const StyledInput = ({filled, variant, value, onChangeText, style = [], ...props}) => {
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
                    color={Utils.validateEmail(value) ? colors.BLUE : colors.RED}
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
        </View>
    );
};

export default StyledInput;

const styles = StyleSheet.create({});