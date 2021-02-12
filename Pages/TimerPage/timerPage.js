// this is the file that runs the timer and the next speech button
import React from 'react'
import {Timer} from './components/Timer'
import {NextSpeech} from "./components/NextSpeechButton";
import {UpperBar} from "./components/UpperBar";
import {View, Text} from "react-native";
import {timerStyles} from "./styles";

export class TimerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speechNum: 0,
            speechTime: 0,
            speechName: this.props.times[0][0]
        }
    }

    nextSpeech = () => {
        if (this.props.times.length === this.state.speechNum + 1)
            return;
        const message = {
            room: this.props.room,
            newSpeech: this.state.speechNum + 1,
            newSpeechName: this.props.times[this.state.speechNum+1][0],
            newSpeechTime: this.props.times[this.state.speechNum+1][1],
        }
        this.props.socket.emit('next', message);
    }

    componentDidMount() {
        this.props.socket.on("next", (msg) => {
            this.setState({
                speechNum: msg.newSpeech,
                speechTime: msg.newSpeechTime,
                speechName: msg.newSpeechName,
            });
        })
    }

    render() {
        const nextSpeechButton = (this.props.isHost ? <NextSpeech nextSpeech={this.nextSpeech}/> : null);

        return (
            <View>
                <View>
                    <UpperBar room={this.props.room} />
                </View>
                <View style={timerStyles.container}>
                    <Text style={timerStyles.speechName}>{this.state.speechName}</Text>
                    <Timer
                        time={this.props.times[this.state.speechNum]} styles={this.props.style}
                        socket={this.props.socket} isHost={this.props.isHost} room={this.props.room} format={this.props.format}
                    />
                    {nextSpeechButton}
                </View>
            </View>
        );
    }
}