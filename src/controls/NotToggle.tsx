import CheckBox from 'react-native-check-box';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NotToggleProps } from '../types';
import { boolToText } from './ValueEditor';

const NotToggle: React.FC<NotToggleProps> = ({ handleOnChange, title, checked }) => {
  return (
    <View style={styles.notToggle}>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <CheckBox
        style={styles.checkbox}
        onClick={() => handleOnChange(!boolToText(!checked))}
        isChecked={!!checked}
      />
      Not
    </View>
  );
};

NotToggle.displayName = 'NotToggle';
export const styles = StyleSheet.create({
  notToggle: {},
  title: {},
  checkbox: {}
})

export default NotToggle;
