import {StyleSheet} from "react-native";

export const startStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontFamily: "RobotoMono",
        fontSize: 30,
    },
    roomInput: {
        borderColor: "black",
        borderWidth: 1,
        width: 350,
        height: 40,
        backgroundColor: "gainsboro",
        padding: 5,
        marginBottom: 5,
    },
    submitButton: {
    },
    separator: {
        marginVertical: 12,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    dropdown: {
        margin: 5,
        width: 350,
        height: 50,
    }
})