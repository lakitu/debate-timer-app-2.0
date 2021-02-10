import {StyleSheet} from "react-native";

export const timerStyles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    count: {
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: "RobotoMono",
    },
    finishedRed: {
        color: 'red',
    },
    finishedBlack: {
        color: 'black',
    },
    continuing: {
        color: "green",
    },
    nextSpeechButton: {
        flex: 1,
        color: "#2bc454",
    },
    speechName: {
        fontSize: 40,
        fontWeight: 'bold',
    }
})

export const upperBarStyles = StyleSheet.create({
    container: {
        backgroundColor: '#2196F3',
        // padding: 50,
        // paddingBottom: 10,
        marginBottom: 100,
    },
    rightText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
        padding: 5,
    }
})