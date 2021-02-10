import React from 'react';
import {View, Text} from 'react-native'
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
                    selectedFormat: json.formats[0],
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
        if (this.state.formatsLoaded)
            return <ChooseFormat formats={this.state.formats} changeFormat={this.changeSelectedFormat} style={startStyles.dropdown}/>
        else
            return null;
    }

    render() {
        let dropdown = this.renderDropdown();

        return (
            <View style={startStyles.container}>
                <Text style={startStyles.title}>Live Debate Timer!</Text>
                <JoinRoom
                    submit={this.joinRoom}
                    socket={this.props.socket}
                />
                {dropdown}
            </View>
        )
    }
}