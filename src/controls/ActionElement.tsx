import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import { ActionProps } from '../types';

const ActionElement: React.FC<ActionProps> = ({ handleOnClick, label = '', title = '' }) => (
  <View>
    <View>
      <Text>{title}</Text>
    </View>
    <View style={styles.button}>
      <Button onPress={handleOnClick} testID={title}>
        {title || label}
      </Button>
    </View>
    <View>
      <Text>{label}</Text>
    </View>
  </View>
);

ActionElement.displayName = 'ActionElement';
export const styles = StyleSheet.create({
  button: {},
});

export default ActionElement;
