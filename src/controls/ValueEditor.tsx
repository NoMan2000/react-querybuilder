import { Picker } from '@react-native-community/picker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ValueEditorProps } from '../types';
import { RadioButton, TextInput, Checkbox, Text } from 'react-native-paper';
import { boolToText, textToBoolean } from '../utils/convertStatusNames';
import { StatusNames } from '../../types';

const ValueEditor: React.FC<ValueEditorProps> = ({
  operator,
  value,
  handleOnChange,
  title,
  type,
  disabled = false,
  values,
  dense,
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
            status={boolToText(value as StatusNames)}
            onPress={() => handleOnChange(textToBoolean(!value))}
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
            dense={dense}
            label={title}
            value={value}
            onChangeText={(text: string) => handleOnChange(text)}
          />
        </View>
      );
  }
};

ValueEditor.displayName = 'ValueEditor';
ValueEditor.defaultProps = {
  dense: true,
};

export const styles = StyleSheet.create({
  select: {},
  textWrapper: {
    marginVertical: 10,
  },
});

export default ValueEditor;
