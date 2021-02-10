import {StyleSheet} from "react-native";

export const startStyles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
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
        height: 40,
        backgroundColor: "gainsboro",
        padding: 5,
        marginBottom: 5,
    },
    submitButton: {
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    dropdown: {
    }
})