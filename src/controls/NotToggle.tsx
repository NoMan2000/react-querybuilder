import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NotToggleProps } from '../types';
import { Checkbox } from 'react-native-paper';
import { boolToText, textToBoolean } from '../utils/convertStatusNames';

const NotToggle: React.FC<NotToggleProps> = ({ handleOnChange, title, checked }) => {
  return (
    <View style={styles.notToggle}>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <Checkbox
        status={boolToText(checked)}
        onPress={() => handleOnChange(textToBoolean(!checked))}
      />
      Not
    </View>
  );
};

NotToggle.displayName = 'NotToggle';
export const styles = StyleSheet.create({
  notToggle: {},
  title: {},
  checkbox: {},
});

export default NotToggle;
