import React from "react";
import {Text, SafeAreaView} from 'react-native'
import {upperBarStyles} from '../styles'

export class UpperBar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render () {
        return (
            <SafeAreaView style={upperBarStyles.container}>
                <Text style={upperBarStyles.rightText}>{(String)(this.props.room)}</Text>
            </SafeAreaView>
        )
    }
}