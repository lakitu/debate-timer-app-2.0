import React from 'react'
import {View, TextInput} from 'react-native'
import {Button} from "react-native-web";

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
                />
                <Button
                    title={"Submit"}
                    onPress={this.submit}
                />
            </View>
        )
    }
}