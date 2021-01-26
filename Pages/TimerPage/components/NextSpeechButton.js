import {Button, View} from "react-native";
import React from 'react';

export class Next extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Button
                    onPress={this.props.nextSpeech} // when clicked, move to the next speech
                    title="Next Speech"
                    style={this.props.style.nextSpeechButton}
                />
            </View>
        )
    }
}