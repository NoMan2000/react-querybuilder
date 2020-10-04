import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, Button } from 'react-native';
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
      setSqlQuery(rulesSet);
    },
    [setSqlQuery],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.headerTitle}>Main App Entry</Text>
      </View>
      <View style={styles.queryBuilderWrapper}>
        <QueryBuilder
          fields={fields}
          // query={query}
          onQueryChange={handleQuery}
        />
      </View>
      <StatusBar style="auto" />

      <View style={styles.horizontalContainer}>
        <TextInput label="Field value" value={field.name} onChangeText={changeFieldName} />
        <TextInput label={'Field Name'} value={field.label} onChangeText={changeFieldLabel} />
        <View>
          <Button onPress={addFields} title={`Add Field ${field.name}`} />
        </View>
      </View>
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
});
