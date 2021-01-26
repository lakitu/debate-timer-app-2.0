import React from 'react';
import {View, Text} from 'react-native'
import {JoinRoom} from "./components/JoinRoom";
import {Separator} from './components/Separator'
import {CreateRoom} from "./components/CreateRoom"
import {ChooseFormat} from "./components/ChooseFormat";


export class StartScreen extends React.Component {
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
                }, () => console.log(this.state.selectedFormat))
            })
    }

    changeSelectedFormat = (format) => {
        this.setState({
            selectedFormat: format,
        })
    }

    submit = (roomCode) => {
        this.props.setRoom(roomCode);
        this.props.setTimes(this.state.selectedFormat);
    }

    setTimes = () => {
        this.props.setRoom(
            this.state.selectedFormat
        )
    }

    renderDropdown() {
        if (this.state.formatsLoaded)
            return (<ChooseFormat formats={this.state.formats} changeFormat={this.changeSelectedFormat}/>)
        else
            return null;
    }

    render() {
        let dropdown = this.renderDropdown();

        return (
            <View>
                <View>
                    <Text style={this.props.style.title}>Live Debate Timer!</Text>
                    <JoinRoom
                        style={this.props.style.roomInput}
                        submit={this.submit}
                    />
                </View>
                <Separator />
                <View>
                    <CreateRoom submit={this.setTimes}/>
                    {dropdown}
                </View>
            </View>
        )
    }
}