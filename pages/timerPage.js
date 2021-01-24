// this is the file that runs the timer and the next speech button
import React from 'react'
import {Timer} from '../components/Timer'
import {Next} from "../components/nextSpeechButton";
import {View, Text} from "react-native";

export class TimerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speechNum: 0,
            speechTime: 0,
            speechName: this.props.times[0][0]
        }
        // this.time = React.createRef();
    }

    nextSpeech = () => {
        const message = {
            room: this.props.room,
            newSpeech: this.state.speechNum + 1,
            newSpeechName: this.props.times[this.state.speechNum+1][0],
            newSpeechTime: this.props.times[this.state.speechNum+1][1],
        }
        this.props.socket.emit('next', message);
    }

    componentDidMount() { //TODO: get the app to work properly on phone
        this.props.socket.on("next", (msg) => {
            this.setState({
                speechNum: msg.newSpeech,
                speechTime: msg.newSpeechTime,
                speechName: msg.newSpeechName,
            })
        })
    }

    render() {
        // console.log(this.time.state)
        if (this.props.isHost === true) { // if you are the host, then you see the next speech button
            console.log(this.state.speechNum)
            return (
                <View style={this.props.style.container}>
                    <Text style={this.props.style.speechName}>{this.state.speechName}</Text>
                    <Timer time={this.props.times[this.state.speechNum]} styles={this.props.style} ref={this.time}/>
                    <Next nextSpeech={this.nextSpeech} style={this.props.style}/>
                </View>
            )
        } else { // if you aren't the host, then you don't get the next speech button
            return (
                <View style={this.props.container}>
                    <Timer time={this.props.times[this.state.speechNum]} styles={this.props.style}/>
                </View>
            )
        }
    }
}