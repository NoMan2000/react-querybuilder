import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { default as QueryBuilder } from './src/index';

export default function App() {
  // TODO:  Use the query for something.
  const [query, setQuery] = React.useState({});
  return (
    <View style={styles.container}>
      <QueryBuilder fields={[{
        name: 'Select one',
        label: 'one',
        id: 'one',
        combinator=''
      }]}
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
