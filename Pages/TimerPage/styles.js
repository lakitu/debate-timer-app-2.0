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