import React from 'react';
import { View } from 'react-native';
import {TimerPage} from './pages/timerPage'
import {StartScreen} from "./pages/startScreen";
import {startStyles, styles, timerStyles} from './styles'
import {loadAsync} from "expo-font";
import io from "socket.io-client";
import {registerRootComponent} from "expo";


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      host: true,
      room: "",
      inRoom: false,
    }
  }

  async componentDidMount() {
    try {
      console.log("loading the font");
      await loadAsync({
        RobotoMono: require('./assets/fonts/RobotoMono/RobotoMono-VariableFont_wght.ttf'),
        Righteous: require('./assets/fonts/Righteous/Righteous-Regular.ttf'),
      }); // loads the font
    } catch {
      console.log("font didn't load")
    } // in case the font doesn't work
    this.socket = io("https://debate-app-server.herokuapp.com/");
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

  render() {
    if (!this.state.inRoom) { // if you aren't yet in the room
      return (
          <View style={styles.container}>
            <StartScreen style={startStyles} setRoom={this.joinRoom} socket={this.socket}/>
          </View>
      )
    } else {
      return (
          <View style={styles.container}>
            <TimerPage times = {times[0]} style={timerStyles} isHost={this.state.host} room={this.state.room} socket={this.socket}/>
          </View>
      )
    }
  }
}

registerRootComponent(App);

const times = [
  [ // CDA times
    ["A1C", 6],["A1 CX", 3], ["N1C", 6],["N1 CX", 3], ["A2C", 6],["A2 CX", 3], ["N2C", 6],["N2 CX", 3],
    ["N1R", 4], ["A1R", 4], ["N2R", 4], ["A2R", 4]
  ],
]