import React from 'react'
import {Picker} from '@react-native-picker/picker'
import {startStyles} from "../styles";

export class ChooseFormat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFormat: null,
            formats: this.props.formats
        }
    }

    componentDidMount() {
        try {
            this.setState({
                selectedFormat: this.props.formats[0],
                formats: this.props.formats,
            })
        } catch (e) {
            this.setState({
                selectedFormat: ["loading", "load"],
                formats: ["loading", "load"]
            })
        }
    }

    changeSelected = (format, i) => {
        console.log(format, i);
        this.props.changeFormat(this.props.formats[i]);
        this.setState({
            selectedFormat: format,
        })
    }

    render() {
        if (this.state.selectedFormat == null) {
            return null;
        } else {
            return (
                <Picker //TODO: make the dropdown change on ios
                    selectedValue={this.state.selectedFormat[1]}
                    style={startStyles.dropdown}
                    onValueChange={this.changeSelected}
                >
                    {this.props.formats.map((format, i) => {
                        return (<Picker.Item label={format[0]} value={format[1]} key={i}/>)
                    })}
                </Picker>
            )
        }
    }
}