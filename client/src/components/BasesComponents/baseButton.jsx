// import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import React from 'react';
// import globalStyles, { colors } from '../../Styles/GlobalStyle';

// const StyledButton = ({
//                           title = '',
//                           onPress = () => {},
//                           loading = false,
//                           disabled = false,
//                           style = [],
//                           textStyle = [],
//                           blueBackground = false,
//                       }) => {
//     const buttonStyles = [
//         globalStyles.button,
//         blueBackground && styles.blueButton,
//         disabled && styles.disabledButton,
//         ...(Array.isArray(style) ? style : [style]),
//     ];

//     const buttonTextStyles = [globalStyles.buttonText, ...textStyle];

//     return (
//         <TouchableOpacity
//             onPress={onPress}
//             style={buttonStyles}
//             disabled={disabled || loading}
//         >
//             {loading ? (
//                 <ActivityIndicator color={colors.WHITE} />
//             ) : (
//                 <Text style={buttonTextStyles}>{title}</Text>
//             )}
//         </TouchableOpacity>
//     );
// };

// export default StyledButton;

// const styles = StyleSheet.create({
//     disabledButton: {
//         backgroundColor: colors.GRAY,
//     },
//     blueButton: {
//         backgroundColor: colors.BLUE,
//     },
// });

// Componente StyledButton
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import globalStyles, { colors } from '../../Styles/GlobalStyle';

const StyledButton = ({
    title = '',
    onPress = () => {},
    loading = false,
    disabled = false,
    style = [],
    textStyle = [],
    blueBackground = false,
}) => {
    const buttonStyles = [
        globalStyles.button,
        blueBackground && styles.blueButton,
        disabled && styles.disabledButton,
        ...(Array.isArray(style) ? style : [style]),
    ];

    // Garantir que textStyle seja um array
    const buttonTextStyles = [globalStyles.buttonText, ...(Array.isArray(textStyle) ? textStyle : [textStyle])];

    return (
        <TouchableOpacity
            onPress={onPress}
            style={buttonStyles}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={colors.WHITE} />
            ) : (
                <Text style={buttonTextStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default StyledButton;

const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: colors.GRAY,
    },
    blueButton: {
        backgroundColor: colors.BLUE,
    },
});
