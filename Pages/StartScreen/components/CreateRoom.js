import React from 'react'
import {View, Button} from 'react-native'

export class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View>
                <Button
                    title={"Create Room"}
                />
            </View>
        )
    }
}