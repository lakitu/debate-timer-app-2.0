// import {Button, View} from "react-native";
import {Pressable, Text, View} from "react-native"
import React from 'react';
import {nextSpeechStyles as style} from "../styles"

export class NextSpeech extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Pressable
                    onPress={this.props.nextSpeech} // when clicked, move to the next speech
                    style={({pressed}) => [
                        {
                            backgroundColor: (pressed ? 'lime' : 'deepskyblue')
                        },
                        style.wrapperCustom
                    ]}
                >
                    <Text style={style.innerText}>Next Speech</Text>
                </Pressable>
            </View>
        )
    }
}