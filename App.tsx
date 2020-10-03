import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { default as QueryBuilder, formatQuery } from './src/index';
import { RuleGroupType } from './types';

declare var msCrypto: globalThis.Crypto;

if (!globalThis.crypto) {
  globalThis.crypto = msCrypto;
}

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
  const [query, setQuery] = React.useState<RuleGroupType>({
    id: 'app',
    combinator: 'and',
    rules: [
      {
        field: 'app',
        operator: 'and',
        value: 'app',
      },
    ],
  });
  const [sqlQuery, setSqlQuery] = React.useState<Params>();

  const handleQuery = (query: RuleGroupType) => {
    const rulesSet = formatQuery(query, 'parameterized') as Params;
    setSqlQuery(rulesSet);
    debugger;
    setQuery(query);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Main App Entry</Text>
      </View>
      <QueryBuilder
        fields={[
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'age', label: 'Age' },
        ]}
        query={query}
        onQueryChange={handleQuery}
      />
      <StatusBar style="auto" />
      <View style={styles.horizontalContainer}>
        <Text>{sqlQuery?.sql}</Text>
        <View style={styles.horizontalContainer}>
          {sqlQuery?.params &&
            sqlQuery.params.map((p) => {
              return <Text key={p}>{p}</Text>;
            })}
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
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
