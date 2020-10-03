import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { RadioButton } from './../../src/components/RadioButton';

import { View, StyleSheet } from 'react-native';

// here I define that I want to create stories with the label "Buttons",
// this will be the name in the storybook navigation

export const buttonStories = storiesOf('RadioButton', module);

// then I add a story with the name default view, I can add multiple stories to button stories
buttonStories.add('default view', () => (
  <View style={styles.mainView}>
    <RadioButton onPress={() => null} />
  </View>
));

export const styles = StyleSheet.create({
  mainView: { flex: 1, alignItems: 'center', justifyContent: 'center' },,
});

export default buttonStories;