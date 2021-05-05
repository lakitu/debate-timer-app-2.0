import React from 'react'
import {View, TextInput, Button} from 'react-native'
import {startStyles} from "../styles";

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
        this.props.setRoom(this.state.roomCode, false);
        // this.props.setTimes();
        this.props.socket.emit("request end time", this.state.roomCode);
    }

    create = () => {
        this.props.setRoom(this.state.roomCode, true);
        this.props.setTimes();
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
                <View style={startStyles.separator}/>
                <Button
                    title={"Create Room"}
                    onPress={this.create}
                    style={startStyles.submitButton}
                />
            </View>
        )
    }
}