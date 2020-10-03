import { Picker } from '@react-native-community/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ValueEditorProps } from '../types';

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
          onValueChange={(itemValue, itemIndex) => handleOnChange(itemValue)}
          selectedValue={value}>
          {values!.map((v) => (
            <Picker.Item label={v.label} value={v.value} />
          ))}
        </Picker>
        </View>
      );

    case 'checkbox':
      return (
        <input
          type="checkbox"
          className={className}
          title={title}
          onChange={(e) => handleOnChange(e.target.checked)}
          checked={!!value}
        />
      );

    case 'radio':
      return (
        <span className={className} title={title}>
          {values!.map((v) => (
            <label key={v.name}>
              <input
                type="radio"
                value={v.name}
                checked={value === v.name}
                onChange={(e) => handleOnChange(e.target.value)}
              />
              {v.label}
            </label>
          ))}
        </span>
      );

    default:
      return (
        <input
          type={inputType || 'text'}
          value={value}
          title={title}
          className={className}
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
