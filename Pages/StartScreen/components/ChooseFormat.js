import React, {useState} from 'react'
import {View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {startStyles} from "../styles";

export function ChooseFormat (props) {
    const [selectedValue, setSelectedValue] = useState("loading");

    const changeValue = (itemValue) => {
        setSelectedValue(itemValue);
        props.changeFormat(itemValue);
    }

    return (
        <View>
            <Picker
                selectedValue={selectedValue}
                style={startStyles.dropdown}
                onValueChange={changeValue}
            >
                {props.formats.map((format, i) => {
                    return <Picker.Item label={format[0]} value={format[1]} key={i}/>
                })}
            </Picker>
        </View>
    )
}