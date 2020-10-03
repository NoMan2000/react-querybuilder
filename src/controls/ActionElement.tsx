import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { ActionProps } from '../types';

const ActionElement: React.FC<ActionProps> = ({ handleOnClick, label= '', title= '' }) => (
  <View>
    <View>
      <Text>{title}</Text>
    </View>
    <View style={styles.button}>
      <Button title={title || label} onPress={(e) => handleOnClick(e)} />
    </View>
    <View>
      <Text>{label}</Text>
    </View>
  </View>
);

ActionElement.displayName = 'ActionElement';
export const styles = StyleSheet.create({
  button: {}
})

export default ActionElement;
