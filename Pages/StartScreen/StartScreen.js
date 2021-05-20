import React from 'react';
import {SafeAreaView, Text} from 'react-native'
import {JoinRoom} from "./components/JoinRoom";
import {ChooseFormat} from "./components/ChooseFormat";
import {startStyles} from "./styles";


export class StartScreen extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            formats: [],
            formatsLoaded: false,
            selectedFormat: '',
        }
    }

    componentDidMount() {
        fetch('https://debate-app-server.herokuapp.com/formats')
            .then(response => response.json())
            .then((json) => {
                this.setState({
                    formats: json.formats,
                    formatsLoaded: true,
                    selectedFormat: json.formats[0][1], // picks the identifier of the first format
                });
            });
    }

    changeSelectedFormat = (format) => {
        this.setState({
            selectedFormat: format,
        })
    }

    joinRoom = (roomCode, isHost) => { // passed to joinRoom
        this.props.setRoom(roomCode, isHost);
        this.props.setTimes(this.state.selectedFormat);
        // this.props.setHost(false);
    }

    renderDropdown() {
        let formats = this.state.formats;
        if (!this.state.formatsLoaded) formats = [["loading", "load"]]
        return <ChooseFormat formats={formats} changeFormat={this.changeSelectedFormat} style={startStyles.dropdown}/>
    }

    render() {
        const dropdown = this.renderDropdown();
        let joinRoom = null;
        if (this.state.formatsLoaded) {
            joinRoom = <JoinRoom
                setRoom={this.props.setRoom}
                setTimes={() => {
                    this.props.setTimes(this.state.selectedFormat)
                }}
                socket={this.props.socket}
            />
        }
        return (
            <SafeAreaView style={startStyles.container}>
                <Text style={startStyles.title}>Live Debate Timer!</Text>
                {joinRoom}
                {dropdown}
            </SafeAreaView>
        )
    }
}