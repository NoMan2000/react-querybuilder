import CheckBox from '@react-native-community/checkbox';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NotToggleProps } from '../types';

const NotToggle: React.FC<NotToggleProps> = ({ handleOnChange, title, checked }) => {
  return (
    <View style={styles.notToggle}>
      <View style={styles.title}>{title}</View>
      <CheckBox
        style={styles.checkbox}
        onValueChange={(value: boolean) => handleOnChange(value)}
        value={!!checked}
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
