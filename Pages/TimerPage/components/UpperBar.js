import React from "react";
import {Text, SafeAreaView} from 'react-native'
import {upperBarStyles} from '../styles'

export function UpperBar (props) {
    return (
        <SafeAreaView style={upperBarStyles.container}>
            <Text style={upperBarStyles.rightText}>{(String)(props.room)}</Text>
        </SafeAreaView>
    )
}