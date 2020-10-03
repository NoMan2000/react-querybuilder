import React from 'react';
import { StyleSheet, View, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { RuleGroupProps } from './types';

export const RuleGroup: React.FC<RuleGroupProps> = ({
  id,
  parentId,
  combinator = 'and',
  rules = [],
  translations,
  schema,
  not,
}) => {
  const {
    combinators,
    controls,
    createRule,
    createRuleGroup,
    getLevel,
    isRuleGroup,
    onGroupAdd,
    onGroupRemove,
    onPropChange,
    onRuleAdd,
    showCombinatorsBetweenRules,
    showNotToggle,
  } = schema;

  const hasParentGroup = () => !!parentId;

  const onCombinatorChange = (value: any) => {
    onPropChange('combinator', value, id);
  };

  const onNotToggleChange = (checked: boolean) => {
    onPropChange('not', checked, id);
  };

  const addRule = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    console.log('addRule', { event });
    const newRule = createRule();
    onRuleAdd(newRule, id);
  };

  const addGroup = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    console.log('removeGroup', { event });
    const newGroup = createRuleGroup();
    onGroupAdd(newGroup, id);
  };

  const removeGroup = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    console.log('removeGroup', { event });
    onGroupRemove(id, parentId);
  };

  const level = getLevel(id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showCombinatorsBetweenRules ? null : (
          <controls.combinatorSelector
            options={combinators}
            value={combinator}
            title={translations.combinators.title}
            handleOnChange={onCombinatorChange}
            rules={rules}
            level={level}
          />
        )}
        {!showNotToggle ? null : (
          <controls.notToggle
            title={translations.notToggle.title}
            checked={not}
            handleOnChange={onNotToggleChange}
            level={level}
          />
        )}
        <controls.addRuleAction
          label={translations.addRule.label}
          title={translations.addRule.title}
          handleOnClick={addRule}
          rules={rules}
          level={level}
        />
        <controls.addGroupAction
          label={translations.addGroup.label}
          title={translations.addGroup.title}
          handleOnClick={addGroup}
          rules={rules}
          level={level}
        />
        {hasParentGroup() ? (
          <controls.removeGroupAction
            label={translations.removeGroup.label}
            title={translations.removeGroup.title}
            handleOnClick={removeGroup}
            rules={rules}
            level={level}
          />
        ) : null}
      </View>
      {rules.map((r, idx) => (
        <View key={r.id}>
          {idx && showCombinatorsBetweenRules ? (
            <controls.combinatorSelector
              options={combinators}
              value={combinator}
              title={translations.combinators.title}
              style={styles.combinatorSelector}
              handleOnChange={onCombinatorChange}
              rules={rules}
              level={level}
            />
          ) : null}
          {isRuleGroup(r) ? (
            <RuleGroup
              id={r.id!}
              schema={schema}
              parentId={id}
              combinator={r.combinator}
              translations={translations}
              rules={r.rules}
              not={!!r.not}
            />
          ) : (
            <controls.rule
              id={r.id!}
              field={r.field}
              value={r.value}
              operator={r.operator}
              schema={schema}
              parentId={id}
              translations={translations}
            />
          )}
        </View>
      ))}
    </View>
  );
};

RuleGroup.displayName = 'RuleGroup';
export const styles = StyleSheet.create({
  container: {},
  header: {},
  combinatorSelector: {},
});
