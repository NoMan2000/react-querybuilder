import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { ValueSelectorProps } from '../types';
import { Picker } from '@react-native-community/picker';


const ValueSelector: React.FC<ValueSelectorProps> = ({
  style = {},
  handleOnChange,
  options,
  title,
  value
}) => (
  <View>
    <View>
        <Text>{title}</Text>
      </View>
    <Picker
      style={{...styles.select, ...style}}
      selectedValue={value}
      onValueChange={(itemValue, itemIndex) => handleOnChange(itemValue, itemIndex)}>
      {options.map((option) => {
        const key = option.id ? `key-${option.id}` : `key-${option.name}`;
        return (
          <Picker.Item key={key} label={option.label} value={option.name} />
        );
      })}
    </Picker>
  </View>
);

ValueSelector.displayName = 'ValueSelector';

export const styles = StyleSheet.create({
  select: {}
})

export default ValueSelector;
