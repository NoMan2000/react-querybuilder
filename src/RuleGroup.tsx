import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RuleGroupProps } from './types';
import { Card, Paragraph } from 'react-native-paper';

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

  const addRule = () => {
    const newRule = createRule();
    onRuleAdd(newRule, id);
  };

  const addGroup = () => {
    const newGroup = createRuleGroup();
    onGroupAdd(newGroup, id);
  };

  const removeGroup = () => {
    onGroupRemove(id, parentId || '');
  };

  const level = getLevel(id);

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.container}>
        <View style={styles.groupContainer}>
          {showCombinatorsBetweenRules ? null : (
            <Paragraph style={styles.paragraphSpacers}>
              <controls.combinatorSelector
                options={combinators}
                value={combinator}
                title={translations.combinators.title}
                handleOnChange={onCombinatorChange}
                rules={rules}
                level={level}
              />
            </Paragraph>
          )}
          {!showNotToggle ? null : (
            <Paragraph style={styles.paragraphSpacers}>
              <controls.notToggle
                title={translations.notToggle.title}
                checked={not}
                handleOnChange={onNotToggleChange}
                level={level}
              />
            </Paragraph>
          )}
          <Paragraph style={styles.paragraphSpacers}>
            <controls.addRuleAction
              label={translations.addRule.label}
              title={translations.addRule.title}
              handleOnClick={addRule}
              rules={rules}
              level={level}
            />
          </Paragraph>
          <Paragraph style={styles.paragraphSpacers}>
            <controls.addGroupAction
              label={translations.addGroup.label}
              title={translations.addGroup.title}
              handleOnClick={addGroup}
              rules={rules}
              level={level}
            />
          </Paragraph>
        </View>
        {hasParentGroup() ? (
          <controls.removeGroupAction
            label={translations.removeGroup.label}
            title={translations.removeGroup.title}
            handleOnClick={removeGroup}
            rules={rules}
            level={level}
          />
        ) : null}
      </Card.Content>
      <Card.Content>
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
      </Card.Content>
    </Card>
  );
};

RuleGroup.displayName = 'RuleGroup';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 750,
    minWidth: 500,
  },
  header: {},
  combinatorSelector: {},
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 100,
  },
  paragraphSpacers: {
    margin: '5 15',
    flex: 1,
  },
});
