// this is the file that runs the timer and the next speech button
import React from 'react'
import {Timer} from './components/Timer'
import {NextSpeech} from "./components/NextSpeechButton";
import {UpperBar} from "./components/UpperBar";
import {View, Text} from "react-native";
import {timerStyles} from "./styles";
import {PauseButton} from "./components/PauseButton";
import {activateKeepAwake} from "expo-keep-awake";

export class TimerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speechNum: 0,
            speechTime: 0,
        }
        this.timerRef = React.createRef();
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
        activateKeepAwake();
        this.props.socket.on("next", (msg) => {
            this.setState({
                speechNum: msg.newSpeech,
                speechTime: msg.newSpeechTime,
                speechName: msg.newSpeechName,
                paused: true,
            });
        });
    }

    pause = () => {
        if (this.props.paused) {
            const remaining = this.timerRef.current.state.remaining; // send the amount of time remaining (paused time)
            const msg = {
                room: this.props.room,
                time: remaining,
            } // room code and time remaining
            this.props.socket.emit('unpause', msg);
        } else { // unpausing
            const remaining = this.timerRef.current.state.endTime - Date.now(); // calculate the remaining time
            const msg = {
                room: this.props.room,
                time: remaining,
            } // room code and time remaining (same as above)
            this.props.socket.emit("pause", msg)
        }
    }

    render() {
        const nextSpeechButton = (this.props.isHost ? <NextSpeech nextSpeech={this.nextSpeech}/> : null);
        const pauseButton = (this.props.isHost ? <PauseButton paused={this.props.paused} pause={this.pause}/>: null);
        return (
            <View style={{marginTop: 1}}>
                <View>
                    <UpperBar room={this.props.room} />
                </View>
                <View style={timerStyles.container}>
                    <Text style={[timerStyles.speechName, {fontSize: 30}]}>{this.props.formatData.format}</Text>
                    <Text style={[timerStyles.speechName, {fontSize: 40}]}> {this.props.times[this.state.speechNum][0]} </Text>
                    <Timer
                        time={this.props.times[this.state.speechNum]} setFormat={this.props.setFormat} paused={this.props.paused} ref={this.timerRef}
                        socket={this.props.socket} isHost={this.props.isHost} room={this.props.room} formatData={this.props.formatData}
                    />
                    {pauseButton}
                    {nextSpeechButton}
                </View>
            </View>
        );
    }
}