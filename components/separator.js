import {StyleSheet, View} from 'react-native'
import React from 'react'

const separator = StyleSheet.create({
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

export const Separator = () => (
    <View style={separator.separator}/>
)