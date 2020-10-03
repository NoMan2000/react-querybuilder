import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-community/picker';
import React from 'react';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import RadioButton from '../components/RadioButton';
import { ValueEditorProps } from '../types';

export const boolToText = (value: string | boolean): string => {
  if (typeof value === 'boolean') {
    return value.toString();
  }
  return value;
};

export const textToBoolean = (value: string | boolean): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (!value) {
    return Boolean(value);
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  console.error('Text to boolean fails with value of ' + value);
  return false;
}

const ValueEditor: React.FC<ValueEditorProps> = ({
  operator,
  value,
  handleOnChange,
  title,
  type,
  inputType,
  values
}) => {
  if (operator === 'null' || operator === 'notNull') {
    return null;
  }

  switch (type) {
    case 'select':
      return (
        <View>
          <View>{title}</View>
        <Picker
          style={styles.select}
          onValueChange={(itemValue, itemIndex) => handleOnChange(itemValue, itemIndex)}
          selectedValue={value}>
          {values!.map((v) => (
            <Picker.Item label={v.label} value={v.value} />
          ))}
        </Picker>
        </View>
      );

    case 'checkbox':
      return (
        <View>
          <View>
            <Text>{title}</Text>
          </View>
        <CheckBox
          disabled={false}
          value={!!value}
          onValueChange={(newValue) => handleOnChange(boolToText(newValue))}

        />
        </View>
      );

    case 'radio':
      return (
        <View>
          <Text>{title}</Text>

          {values!.map((v) => (
            <View>
            <RadioButton
              key={v.name}
              onPress={(e: GestureResponderEvent) => handleOnChange(e.target)}
              checked={value === v.name}
              />
              <View><Text>{v.label}</Text></View>
            </View>
          ))}
        </View>
      );

    default:
      return (
        <input
          type={inputType || 'text'}
          value={value}
          title={title}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      );
  }
};

ValueEditor.displayName = 'ValueEditor';

export const styles = StyleSheet.create({
  select: {}
})

export default ValueEditor;
