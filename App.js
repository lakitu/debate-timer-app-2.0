/* Requirements for Production
*  TODO: Prep Timers
*  TODO: Display format name
*  TODO: Offline times
*  TODO: Set up authentication for firebase
* */

import React from 'react';
import {TimerPage} from './Pages/TimerPage/TimerPage'
import {StartScreen} from "./Pages/StartScreen/StartScreen";
import {loadAsync, FontDisplay} from "expo-font";
import io from "socket.io-client";
import {registerRootComponent} from "expo";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        const formatDataTemplate = {
            format: '',
            prep: 0,
            sides: {
                Prop: "Proposition",
                Opp: "Opposition",
            },
            times: [["Loading", 0]],
        }

        this.state = {
            host: true,
            room: "",
            inRoom: false,
            fontsLoaded: false,
            timesLoaded: false,
            formatData: formatDataTemplate,
            paused: true,
        }
        this._isMounted = false;
    }


    async loadFonts() {
        await loadAsync({
            'RobotoMono': {
                uri: require('./assets/fonts/RobotoMono/RobotoMono-VariableFont_wght.ttf'),
                fontDisplay: FontDisplay.FALLBACK,
            },
            'Righteous': {
                uri: require('./assets/fonts/Righteous/Righteous-Regular.ttf'),
                fontDisplay: FontDisplay.FALLBACK,
            }
        })
        this._isMounted && this.setState({
            fontsLoaded: true,
        })
        return true;
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.loadFonts();
        // noinspection JSValidateTypes
        this.socket = io("ws://debate-app-server.herokuapp.com/");
        this.socket.on("new room code", (code) => {
            this._isMounted && this.setState({
                room: code,
                inRoom: true,
                paused: true,
            });
        });
        this.socket.on("pause", () => {
            this.setState({paused: true});
        });
        this.socket.on("unpause", () => {
            this.setState({paused: false});
        });
        this.socket.on("next", () => {
            this.setState({paused: true,})
        })
    }

    joinRoom = (roomCode, isHost) => {
        this.setState({
            room: roomCode,
            inRoom: true,
            host: isHost,
        })
        if (!isHost) {
            this.socket.emit("join", roomCode);
        }
        this.socket.on("joined", () => {
        })
    }

    setTimes = (newFormat) => {
        fetch(`https://debate-app-server.herokuapp.com/times/${newFormat.toLowerCase()}`)
            .then(json => json.json())
            .then(formatData => {
                this.setState({
                    formatData: formatData,
                    timesLoaded: true,
                })
            })
    }

    render() {
        if (this.state.fontsLoaded) {
            if (!this.state.inRoom) { // StartScreen
                return (
                    <StartScreen
                        socket={this.socket} format={this.state.formatData.format}
                        setRoom={this.joinRoom} setTimes={this.setTimes}
                    />
                )
            }  // if you aren't yet in the room, send the start screen
            else {
                if (!this.state.timesLoaded) {
                    return (
                        <TimerPage times={[["Loading", 0]]} paused={this.state.paused}
                                   isHost={this.state.host} room={this.state.room}
                                   socket={this.socket} setFormat={this.setTimes} formatData={this.state.formatData}
                        />
                    )
                } // if times not yet loaded
                else { // if times have been received by the client
                    return (
                        <TimerPage times={this.state.formatData.times} paused={this.state.paused}
                                   isHost={this.state.host} room={this.state.room}
                                   socket={this.socket} setFormat={this.setTimes} formatData={this.state.formatData}
                        />
                    )
                } // if times have been received by the client, send the timer page
            }
        } else {
            return null;
        } // if fonts not loaded, send null
    }
}

registerRootComponent(App);