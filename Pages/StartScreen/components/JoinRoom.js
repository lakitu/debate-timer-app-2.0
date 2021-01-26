import React from 'react'
import {View, TextInput, Button} from 'react-native'

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

    submit = () => {
        this.props.submit(this.state.text);
    }

    render() {
        return(
            <View>
                <TextInput
                    onChangeText={this.textChange}
                    style={this.props.style}
                    placeholder="Room Code"
                    onSubmitEditing={this.submit}
                    autoCapitalize={"none"}
                    autoCompleteType={"off"}
                    autoCorrect={false}
                />
                <Button
                    title={"Join Room"}
                    onPress={this.submit}
                />
            </View>
        )
    }
}