import React, {useState} from 'react'
import {Picker, View} from 'react-native'
import {startStyles} from "../styles";

export function ChooseFormat (props) {
    const [selectedValue, setSelectedValue] = useState("loading");

    const changeValue = (itemValue) => {
        console.log(itemValue);
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

// import React, { useState } from "react";
// import { View, Picker, StyleSheet } from "react-native";
//
// export const ChooseFormat = (props) => {
//     const [selectedValue, setSelectedValue] = useState(props.formats[0][1]);
//
//     const changeValue = (itemValue) => {
//         setSelectedValue(itemValue);
//         props.changeFormat(itemValue);
//     }
//
//     return (
//         <View style={styles.container}>
//             <Picker
//                 selectedValue={selectedValue}
//                 style={{ height: 50, width: 150 }}
//                 onValueChange={changeValue}
//             >
//                 {props.formats.map((format, i) => {
//                     return <Picker.Item label={format[0]} value={format[1]} key={i}/>
//                 })}
//                 {/*<Picker.Item label="Java" value="java" />*/}
//                 {/*<Picker.Item label="JavaScript" value="js" />*/}
//             </Picker>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 40,
//         // alignItems: "center"
//     }
// });