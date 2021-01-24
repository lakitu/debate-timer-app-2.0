import React from 'react';
import {View, Text} from 'react-native'
import {JoinRoom} from "../components/joinRoom";
import {Separator} from '../components/separator'
import {NewRoom} from "../components/newRoom"


export class StartScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={this.props.style.title}>Live Debate Timer!</Text>
                    <JoinRoom
                        style={this.props.style.roomInput}
                        submit={this.props.setRoom}
                    />
                </View>
                <Separator />
                <View>
                    <NewRoom/>
                </View>
            </View>
        )
    }
}