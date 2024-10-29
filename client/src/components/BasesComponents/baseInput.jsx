import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles, {colors} from '../../Styles/GlobalStyle';
import Ionicons from "@expo/vector-icons/Ionicons";
import Utils from "../../utils/Utils";

const StyledInput = ({...props}) => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        filled,
        variant,
        value,
    } = props;
    let inputStyles = [globalStyles.inputText];
    let viewStyles = [globalStyles.input];
    if (filled) {
        inputStyles.push(globalStyles.filledInputText)
        viewStyles.push(globalStyles.filledInput)
    }


    return (
        <View style={viewStyles}>
            <TextInput
                style={inputStyles}
                secureTextEntry={!showPassword}
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

            {(variant === 'password') && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "eye" : "eye-off"}
                        size={24}
                        color={colors.WHITE}
                        style={styles.inputIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default StyledInput;

const styles = StyleSheet.create({});
