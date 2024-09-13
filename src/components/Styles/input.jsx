import{ StyleSheet } from "react-native"

const StyleInput = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(53,53,53,.08)',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: 'rgba(53,53,53,.08)',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        height: 50,
        color: '#353535',
        paddingHorizontal: 10,
    },
    inputTitle: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FD7FAC',
    }
});

export default StyleInput