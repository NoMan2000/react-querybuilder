import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { default as QueryBuilder } from './src/index';

export default function App() {
  // TODO:  Use the query for something.
  const [query, setQuery] = React.useState({});
  return (
    <View style={styles.container}>
      <QueryBuilder combinator='and' fields={[
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
      { name: 'age', label: 'Age' }
    ];}
      onQueryChange={setQuery} />
      <StatusBar style="auto" />
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
});
