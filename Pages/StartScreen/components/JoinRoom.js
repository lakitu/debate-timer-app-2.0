import React from 'react'
import {View, TextInput, Button} from 'react-native'
import {startStyles} from "../styles";
import {Separator} from "./Separator";

export class JoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: '',
        }
    }

    textChange = (newText) => {
        this.setState({
            roomCode: newText,
        })
    }

    join = () => {
        this.props.submit(this.state.roomCode, false);
        const msg = {
            room: this.state.roomCode,
        }
        this.props.socket.emit("request end time", msg)
    }

    create = () => {
        this.props.submit(this.state.roomCode, true);
        this.props.socket.emit("create room", null);
    }

    render() {
        return(
            <View>
                <TextInput
                    onChangeText={this.textChange}
                    style={startStyles.roomInput}
                    placeholder="Room Code"
                    onSubmitEditing={this.submit}
                    autoCapitalize={"none"}
                    autoCompleteType={"off"}
                    autoCorrect={false}
                />
                <Button
                    title={"Join Room"}
                    onPress={this.join}
                    style={startStyles.submitButton}
                />
                <Separator />
                <Button
                    title={"Create Room"}
                    onPress={this.create}
                    style={startStyles.submitButton}
                />
            </View>
        )
    }
}