import React from 'react';
import { View } from 'react-native';
import {TimerPage} from './Pages/TimerPage/timerPage'
import {StartScreen} from "./Pages/StartScreen/startScreen";
import {styles} from './styles'
import * as Font from 'expo-font';
import io from "socket.io-client";
import {registerRootComponent} from "expo";
import {timerStyles} from "./Pages/TimerPage/styles";
import {startStyles} from "./Pages/StartScreen/styles";


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
    await Font.loadAsync({
      'RobotoMono': {
        uri: require('./assets/fonts/RobotoMono/RobotoMono-VariableFont_wght.ttf'),
        fontDisplay: Font.FontDisplay.FALLBACK,
      },
      'Righteous': {
        uri: require('./assets/fonts/Righteous/Righteous-Regular.ttf'),
        fontDisplay: Font.FontDisplay.FALLBACK,
      }
    })
    this._isMounted && this.setState({
      fontsLoaded: true,
    })
    return true;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.loadFonts()
    // noinspection JSValidateTypes
    this.socket = io("ws://debate-app-server.herokuapp.com/");
    this.socket.on('connect', () => {
      console.log("socket connected");
    })
  }

  joinRoom = (roomCode) => {
    this.setState({
      room: roomCode,
      inRoom: true,
    })
    this.socket.emit("room", roomCode);
  }

  setFormat = (newFormat) => {
    fetch(`https://debate-app-server.herokuapp.com/times/${newFormat[1].toLowerCase()}`)
        .then(json => json.json())
        .then(newTimes => {
          this.setState({
            times: newTimes.times,
            timesLoaded: true,
          })
        })
    // times = newTimes;
  }

  render() {
    if (this.state.fontsLoaded) {
      if (!this.state.inRoom) { // if you aren't yet in the room
        return (
            <View style={styles.container}>
              <StartScreen style={startStyles} setRoom={this.joinRoom} socket={this.socket} setTimes={this.setFormat}/>
            </View>
        )
      } else {
        if (!this.state.timesLoaded)
          return null;
        else {
          return (
              <View style={styles.container}>
                <TimerPage times={this.state.times} style={timerStyles} isHost={this.state.host} room={this.state.room}
                           socket={this.socket}/>
              </View>
          )
        }
      }
    } else {
      return null;
    }
  }
}

registerRootComponent(App);

let times = [
  [ // CDA times
    ["A1C", 6],["A1 CX", 3], ["N1C", 6],["N1 CX", 3], ["A2C", 6],["A2 CX", 3], ["N2C", 6],["N2 CX", 3],
    ["N1R", 4], ["A1R", 4], ["N2R", 4], ["A2R", 4]
  ],
]