import {StyleSheet} from "react-native";

export const timerStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
        color: "#2bc454",
    },
    speechName: {
        fontSize: 40,
        fontWeight: 'bold',
    }
})