import { Picker } from '@react-native-community/picker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ValueEditorProps } from '../types';
import { RadioButton, TextInput, Checkbox, Text } from 'react-native-paper';

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
};

const ValueEditor: React.FC<ValueEditorProps> = ({
  operator,
  value,
  handleOnChange,
  title,
  type,
  disabled = false,
  values,
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
            onValueChange={(itemValue) => handleOnChange(itemValue)}
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
          <Checkbox
            disabled={disabled}
            status={value ? 'checked' : 'unchecked'}
            onPress={() => handleOnChange(!value)}
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
                status={value === v.name ? 'checked' : 'unchecked'}
                key={v.name}
                onPress={() => handleOnChange(v.name)}
                value={value || ''}>
                <View>
                  <Text>{v.label}</Text>
                </View>
              </RadioButton>
            </View>
          ))}
        </View>
      );

    default:
      return (
        <View>
          <TextInput
            label={title}
            value={value}
            onChangeText={(text: string) => handleOnChange(text)}
          />
        </View>
      );
  }
};

ValueEditor.displayName = 'ValueEditor';

export const styles = StyleSheet.create({
  select: {},
});

export default ValueEditor;
