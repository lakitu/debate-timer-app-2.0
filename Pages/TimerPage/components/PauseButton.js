import {Pressable, Text, View} from "react-native"
import React from 'react';
import {speechButtons as style} from "../styles"

export function PauseButton(props) {
    return(
        <View>
            <Pressable
                onPress={() => {props.pause()}} // when clicked, move to the next speech
                style={({pressed}) => [
                    {
                        backgroundColor: (props.paused ? (pressed ? "yellow" : "lime") : (pressed ? 'yellow' : 'red'))
                    },
                    style.wrapperCustom
                ]}
            >
                <Text style={style.innerText}>
                    {(props.paused ? "Play" : "Pause")}
                </Text>
            </Pressable>
        </View>
    )
}