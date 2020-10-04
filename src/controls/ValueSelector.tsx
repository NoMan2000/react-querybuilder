import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ValueSelectorProps } from '../types';
import { Picker } from '@react-native-community/picker';

const ValueSelector: React.FC<ValueSelectorProps> = ({ handleOnChange, options, title, value }) => {
  return (
    <View>
      <View>
        <Text>{title}</Text>
      </View>
      <Picker
        style={styles.select}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => handleOnChange(itemValue, itemIndex)}>
        {options.map((option) => {
          const key = option.id ? `key-${option.id}` : `key-${option.name}`;
          return <Picker.Item key={key} label={option.label} value={option.name} />;
        })}
      </Picker>
    </View>
  );
};

ValueSelector.displayName = 'ValueSelector';

export const styles = StyleSheet.create({
  select: {},
});

export default ValueSelector;
