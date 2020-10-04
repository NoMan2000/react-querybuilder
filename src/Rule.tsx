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
    controls,
    fields,
    getInputType,
    getLevel,
    getOperators,
    getValueEditorType,
    getValues,
    onPropChange,
    onRuleRemove,
  },
}) => {
  const onElementChanged = (property: string, passedValue: any) => {
    onPropChange(property, passedValue, id);
  };

  const onFieldChanged = (passedValue: any) => {
    onElementChanged('field', passedValue);
  };

  const onOperatorChanged = (passedValue: string) => {
    onElementChanged('operator', passedValue);
  };

  const onValueChanged = (passedValue: string) => {
    onElementChanged('value', passedValue);
  };

  const removeRule = () => {
    onRuleRemove(id, parentId);
  };

  const fieldData = arrayFind(fields, (f) => f.name === field);
  const level = getLevel(id);

  return (
    <View style={styles.container}>
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
      </View>
      <View style={styles.removeRuleActionContainer}>
        <controls.removeRuleAction
          label={translations.removeRule.label}
          title={translations.removeRule.title}
          style={styles.removeRuleAction}
          handleOnClick={removeRule}
          level={level}
        />
      </View>
    </View>
  );
};

Rule.displayName = 'Rule';

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: '10 5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldSelector: {
    margin: '10 10',
  },
  operatorSelector: {},
  valueEditor: {},
  removeRuleActionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  removeRuleAction: {},
});
