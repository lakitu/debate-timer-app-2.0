import {Text, View} from 'react-native'
import React from 'react'
import {timerStyles} from "../styles";

export class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            timerLength: 0,
            endTime: 0,
            displayTime: this.timeToDisplay((this.props.time[1])*60*1000),
            speechName: this.props.time[0],
            finished: false,
            flash: false,
            paused: this.props.paused,
            remaining: this.props.time[1]*60*1000,
        }
    }

    timeToDisplay(millis) {
        if (this.state === undefined || !this.state.paused) { // if the timer is still playing
            const actualSeconds = millis / 1000
            const minutes = Math.floor(actualSeconds / 60)
            const seconds = Math.floor(actualSeconds % 60)
            const displaySeconds = ("0" + (String)(seconds)).slice(-2);
            const tenths = Math.floor((millis / 100) % 10);
            return(minutes + ":" + displaySeconds + "." + tenths);
        } else { // if paused
            const actualSeconds = this.state.remaining / 1000;
            const minutes = Math.floor(actualSeconds/60);
            const seconds = Math.floor(actualSeconds % 60);
            const displaySeconds = ("0" + (String)(seconds)).slice(-2);
            const tenths = Math.floor((this.state.remaining/100) % 10);
            return (minutes + ":" + displaySeconds + "." + tenths);
        }
    }

    setUp() {
        this.setState(() => ({
            timerLength: this.props.time[1]*60*1000,
            endTime: Date.now() + this.props.time[1]*60*1000,
            remaining: this.props.time[1]*60*1000,
        }),() => { // then sets the 0.1 second intervals
            this.tick = setInterval(() => { // runs every 100 milliseconds
                this.setState(() => ({ // sets state (every tenth of a second)
                    displayTime: (this.state.endTime < Date.now() ? // sets display time (if the time is up or not)
                        "0:00.0" : this.timeToDisplay(this.state.endTime-Date.now())), // if time is up, 0:00.0, else display properly
                    finished: (this.state.endTime < Date.now()), // true or false for finished
                })); // setState finishes
            }, 100); // setInterval finishes
        }); // ends original setState callback, which holds the setInterval function
    }

    componentDidMount() {
        this.setUp()
        this.flashInterval = setInterval(() => { // in the callback for setting timer length (every 0.5 seconds)
            this.setState ((prevState) => ({
                flash: !prevState.flash, // sets the flash variable every 0.5 seconds
            }))
        }, 500);
        if (this.props.isHost) {
            this.props.socket.on("new connection", () => {
                const message = {
                    format: this.props.formatData.abbreviation,
                    endTime: this.state.endTime,
                    isHost: this.props.isHost,
                    room: this.props.room,
                }
                this.props.socket.emit("end time", message);
            });
        }
        this.props.socket.on("end time", (msg) => {
            this.setState({
                endTime: msg.endTime,
            });
            this.props.setFormat(msg.format);
        });
        this.props.socket.on("pause", msg => {
            this.setState({
                paused: true,
                remaining: msg.time,
            });
        });
        this.props.socket.on("unpause", (msg) => {
            this.setState({
                paused: false,
                remaining: msg.time,
                endTime: Date.now()+msg.time,
            });
        });
        this.props.socket.on("next", (msg) => {
            this.setState({
                remaining: msg.speechTime,
                paused: true,
            });
        });
    }

    componentWillUnmount() {
        clearInterval(this.flashInterval);
        clearInterval(this.tick);
    }

    componentDidUpdate() {
        if (this.props.time[0] !== this.state.speechName) {
            this.setState(() => ({
                speechName: this.props.time[0],
            }));
            this.setUp();
        } // if new speech
    }

    render() {
        return(
            <View>
                <Text style={[timerStyles.count,
                    (this.state.finished ? (this.state.flash ? timerStyles.finishedRed: timerStyles.finishedBlack)
                        : timerStyles.continuing),
                ]}>
                    {this.state.displayTime}
                </Text>
            </View>
        )
    }
}