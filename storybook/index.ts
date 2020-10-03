import { getStorybookUI, configure } from '@storybook/react-native';
import { expo } from './../app.json';
import { AppRegistry } from 'react-native';
import './rn-addons';

configure(() => {
  require('./stories.ts'); // we will create this file in the next steps
}, module);

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent(expo.name, () => StorybookUIRoot);
