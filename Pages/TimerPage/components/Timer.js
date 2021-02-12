import {Text, View} from 'react-native'
import React from 'react'

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
        }
    }

    timeToDisplay(millis) {
        let actualSeconds = millis / 1000
        let minutes = Math.floor(actualSeconds / 60)
        let seconds = Math.floor(actualSeconds % 60)
        let displaySeconds = ("0" + (String)(seconds)).slice(-2);
        let tenths = Math.floor((millis / 100) % 10);
        let output = minutes + ":" + displaySeconds + "." + tenths;
        return (output);
    }

    setUp() {
        this.setState(() => ({
            timerLength: this.props.time[1]*60*1000,
            // timerLength: this.props.time[1]*1000,
        }), () => { // first sets the timer length
            this.setState(() => ({ // then sets the end time
                endTime: Date.now() + this.state.timerLength,
            }), () => { // then sets the 0.1 second intervals
                this.tick = setInterval(() => { // runs every 100 milliseconds
                    this.setState(() => ({ // sets state (every tenth of a second)
                        displayTime: (this.state.endTime < Date.now() ? // sets display time (if the time is up or not)
                            "0:00.0" : this.timeToDisplay(this.state.endTime-Date.now())), // if time is up, 0:00.0, else display properly
                        finished: (this.state.endTime < Date.now()), // true or false for finished
                    })) // setState finishes
                }, 100); // setInterval finishes
            }) // ends callback for setting start and end times (basically setInterval)
        }) // ends the setState for timerLength
    }

    componentDidMount() {
        this.setUp()
        // this.props.ref = this.state.endTime;
        this.flashInterval = setInterval(() => { // in the callback for setting timer length (every 0.5 seconds)
            this.setState ((prevState) => ({
                flash: !prevState.flash, // sets the flash variable every 0.5 seconds
            }))
        }, 500);
        this.props.socket.on("new connection", () => {
            const message = {
                format: this.props.format,
                endTime: this.state.endTime,
                isHost: this.props.isHost,
                room: this.props.room,
            }
            this.props.socket.emit("end time", message);
        });
        this.props.socket.on("end time", (msg) => {
            this.setState({
                endTime: msg.endTime,
            });
            this.props.setFormat(msg.format);
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
                <Text style={[this.props.styles.count,
                    (this.state.finished ? (this.state.flash ? this.props.styles.finishedRed: this.props.styles.finishedBlack)
                        : this.props.styles.continuing),
                ]}>
                    {this.state.displayTime}
                </Text>
            </View>
        )
    }
}