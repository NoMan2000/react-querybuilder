import React from 'react';
import { StyleSheet } from 'react-native';
import { ActionProps } from '../types';

const ActionElement: React.FC<ActionProps> = ({ handleOnClick, label, title }) => (
  <button style={styles.button} title={title} onClick={(e) => handleOnClick(e)}>
    {label}
  </button>
);

ActionElement.displayName = 'ActionElement';
export const styles = StyleSheet.create({
  button: {}
})

export default ActionElement;
