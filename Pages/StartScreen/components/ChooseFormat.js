import React from 'react'
import {Picker} from '@react-native-picker/picker'

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
        }
    }

    changeSelected = (format, i) => {
        console.log(format, i);
        this.props.changeFormat(this.props.formats[i]);
        this.setState({
            selectedFormat: format[1],
        })
    }

    render() {
        if (this.state.selectedFormat == null) {
            return null;
        } else {
            return (
                <Picker
                    selectedValue={this.state.selectedFormat[1]}
                    style={{height: 50, width: 300}}
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