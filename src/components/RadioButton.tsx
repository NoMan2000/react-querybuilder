import React from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

type RadioButtonProps = {
    circle?: StyleProp<ViewStyle>;
    onPress: (event: GestureResponderEvent) => void;
    checked?: boolean;
}
// TODO:  Add in an override here for the styles.
const RadioButton = (props: RadioButtonProps) => {
    return (
        <TouchableOpacity style={styles.circle} onPress={props.onPress}>
            {props.checked ? (<View style={styles.checkedCircle} />) : (<View />)}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    checkedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#131313',
    },
});

export default RadioButton;