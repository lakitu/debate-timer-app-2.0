import React from 'react';
import {TimerPage} from './Pages/TimerPage/timerPage'
import {StartScreen} from "./Pages/StartScreen/startScreen";
import {loadAsync, FontDisplay} from "expo-font";
import io from "socket.io-client";
import {registerRootComponent} from "expo";
import {timerStyles} from "./Pages/TimerPage/styles";


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      host: true,
      room: "",
      inRoom: false,
      fontsLoaded: false,
      format: '',
      times: [],
      timesLoaded: false,
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
    this.socket.on('connect', () => {
    });
    this.socket.on("new room code", (code) => {
      this._isMounted && this.setState({
        room: code,
        inRoom: true,
      });
    });
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

  setFormat = (newFormat) => {
    fetch(`https://debate-app-server.herokuapp.com/times/${newFormat.toLowerCase()}`)
        .then(json => json.json())
        .then(newTimes => {
          this.setState({
            format: newFormat,
            times: newTimes.times,
            timesLoaded: true,
          })
        })
  }

  render() {
    if (this.state.fontsLoaded) {
      if (!this.state.inRoom) { // StartScreen
        return (
            <StartScreen
                socket={this.socket} format={this.state.format}
                setRoom={this.joinRoom} setTimes={this.setFormat}
            />
        )
      }  // if you aren't yet in the room, send the start screen
      else {
        if (!this.state.timesLoaded) {
          return null;
        } // if times not yet loaded
        else { // if times have been received by the client
          return (
              <TimerPage times={this.state.times} style={timerStyles}
                         isHost={this.state.host} room={this.state.room}
                         socket={this.socket} setFormat={this.setFormat} format={this.state.format}
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