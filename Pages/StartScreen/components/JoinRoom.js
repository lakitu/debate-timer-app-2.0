import React from 'react'
import {View, TextInput, Button} from 'react-native'
import {startStyles} from "../styles";
import {Separator} from "./Separator";

export class JoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    textChange = (newText) => {
        this.setState({
            text: newText,
        })
    }

    join = () => {
        this.props.submit(this.state.text, false);
    }

    create = () => {
        this.props.submit(this.state.text, true);
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