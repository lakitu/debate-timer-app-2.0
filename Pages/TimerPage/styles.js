import {StyleSheet} from "react-native";

export const timerStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightContainer: {
        backgroundColor: '#d0d0c0',
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
    speechName: {
        // fontSize: 40,
        fontWeight: 'bold',
        textAlign: "center",
    }
})

export const upperBarStyles = StyleSheet.create({
    container: {
        backgroundColor: '#2196F3',
        marginBottom: 20,
    },
    rightText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
        padding: 5,
        fontFamily: "RobotoMono"
    }
})

const buttonSize = 200;
export const speechButtons = StyleSheet.create({
    wrapperCustom: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // borderRadius: buttonSize,
        padding: 6,
        width: buttonSize,
        height: buttonSize*0.75,
        margin: buttonSize/10,
    },
    innerText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'rgb(40, 40, 40)'
    }
})