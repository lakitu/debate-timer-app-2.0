import {StyleSheet} from "react-native";

export const timerStyles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'flex-start',
        // marginTop: 3,
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const startStyles = StyleSheet.create({
    title: {
        fontFamily: "RobotoMono",
        fontSize: 40,
    },
    roomInput: {
        borderColor: "black",
        borderWidth: 1,
        height: 40,
        backgroundColor: "gainsboro",
    }
})