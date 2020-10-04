import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { TextInput, Headline, Text, Card, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Button } from 'react-native';
import { default as QueryBuilder, formatQuery } from './src/index';
import { RuleGroupType, Field } from './types';

type Params = {
  sql: string;
  params: string[];
};

/**
 * export interface RuleType {
    id?: string;
    field: string;
    operator: string;
    value: any;
}
export interface RuleGroupType {
    id: string;
    combinator: string;
    rules: (RuleType | RuleGroupType)[];
    not?: boolean;
}
 */

export default function App() {
  // TODO:  Use the query for something.
  const [sqlQuery, setSqlQuery] = React.useState<Params>();
  const [jsonQuery, setJsonQuery] = React.useState<Params>();
  const [rawSqlQuery, setRawSqlQuery] = React.useState<Params>();
  const [jsonNoIdsQuery, setJsonNoIdsQuery] = React.useState<Params>();

  const [fields, setFields] = React.useState<Array<Field>>([
    { label: 'username', name: 'username', id: 'username' },
    { label: 'email', name: 'email', id: 'email' },
  ]);
  const [field, setField] = React.useState<Field>({ label: '', name: '', id: '' });

  const changeFieldName = React.useCallback(
    (name: string) => {
      setField({ ...field, id: name, name: name });
    },
    [field, setField],
  );

  const changeFieldLabel = React.useCallback(
    (label: string) => {
      setField({ ...field, label });
    },
    [field, setField],
  );

  const addFields = React.useCallback(() => {
    setFields([...fields, field]);
  }, [fields, setFields, field]);

  const handleQuery = React.useCallback(
    (innerQuery: RuleGroupType) => {
      const rulesSet = formatQuery(innerQuery, 'parameterized') as Params;
      const jsonRulesSet = formatQuery(innerQuery, 'json') as Params;
      const rawSqlRulesSet = formatQuery(innerQuery, 'sql') as Params;
      const jsonNoIdsRuleset = formatQuery(innerQuery, 'json_without_ids') as Params;
      setSqlQuery(rulesSet);
      setJsonQuery(jsonRulesSet);
      setRawSqlQuery(rawSqlRulesSet);
      setJsonNoIdsQuery(jsonNoIdsRuleset);
    },
    [setSqlQuery, setJsonQuery, setRawSqlQuery],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Headline style={styles.headerTitle}>Main App Entry</Headline>
      </View>
      <View style={styles.queryBuilderWrapper}>
        <QueryBuilder
          fields={fields}
          // query={query}
          onQueryChange={handleQuery}
        />
      </View>
      <StatusBar style="auto" />

      <View style={styles.fieldWrapper}>
        <TextInput
          style={styles.fieldName}
          label={'Field Name'}
          value={field.label}
          onChangeText={changeFieldLabel}
          dense
        />
        <TextInput
          style={styles.fieldValue}
          label="Field value"
          value={field.name}
          onChangeText={changeFieldName}
          dense
        />
        <View>
          <Button onPress={addFields} title={'Add Field'} />
        </View>
      </View>
      <Card>
        <Card.Title title="Formatted Query" />
        <Card.Content>
          <View>
            <Text style={styles.headerTitle}>parameterized sql</Text>
            <Paragraph>{JSON.stringify(sqlQuery)}</Paragraph>
          </View>
          <View>
            <Text style={styles.headerTitle}>Json with Ids</Text>
            <Paragraph>{JSON.stringify(jsonQuery)}</Paragraph>
          </View>
          <View>
            <Text style={styles.headerTitle}>Raw Sql Query</Text>
            <Paragraph>{JSON.stringify(rawSqlQuery)}</Paragraph>
          </View>
          <View>
            <Text style={styles.headerTitle}>Json no ids</Text>
            <Paragraph>{JSON.stringify(jsonNoIdsQuery)}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  queryBuilderWrapper: {
    marginTop: 15,
    marginBottom: 15,
  },
  headerArea: {
    marginBottom: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  fieldWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldValue: {
    marginRight: 15,
  },
  fieldName: {
    marginRight: 15,
  },
});
