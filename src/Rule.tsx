import arrayFind from 'array-find';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RuleProps } from './types';

export const Rule: React.FC<RuleProps> = ({
  id,
  parentId,
  field,
  operator,
  value,
  translations,
  schema: {
    classNames,
    controls,
    fields,
    getInputType,
    getLevel,
    getOperators,
    getValueEditorType,
    getValues,
    onPropChange,
    onRuleRemove
  }
}) => {
  const onElementChanged = (property: string, value: any) => {
    onPropChange(property, value, id);
  };

  const onFieldChanged = (value: any) => {
    onElementChanged('field', value);
  };

  const onOperatorChanged = (value: any) => {
    onElementChanged('operator', value);
  };

  const onValueChanged = (value: any) => {
    onElementChanged('value', value);
  };

  const removeRule = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    onRuleRemove(id, parentId);
  };

  const fieldData = arrayFind(fields, (f) => f.name === field);
  const level = getLevel(id);

  return (
    <View style={styles.header}>
      <controls.fieldSelector
        options={fields}
        title={translations.fields.title}
        value={field}
        operator={operator}
        style={styles.fieldSelector}
        handleOnChange={onFieldChanged}
        level={level}
      />
      <controls.operatorSelector
        field={field}
        fieldData={fieldData}
        title={translations.operators.title}
        options={getOperators(field)}
        value={operator}
        style={styles.operatorSelector}
        handleOnChange={onOperatorChanged}
        level={level}
      />
      <controls.valueEditor
        field={field}
        fieldData={fieldData}
        title={translations.value.title}
        operator={operator}
        value={value}
        type={getValueEditorType(field, operator)}
        inputType={getInputType(field, operator)}
        values={getValues(field, operator)}
        style={styles.valueEditor}
        handleOnChange={onValueChanged}
        level={level}
      />
      <controls.removeRuleAction
        label={translations.removeRule.label}
        title={translations.removeRule.title}
        style={styles.removeRuleAction}
        handleOnClick={removeRule}
        level={level}
      />
    </View>
  );
};

Rule.displayName = 'Rule';

export const styles = StyleSheet.create({
  header: {},
  fieldSelector: {},
  operatorSelector: {},
  valueEditor: {},
  removeRuleAction: {}
});