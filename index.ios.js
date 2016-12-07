import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';

import model from './src/models/example';
import App from './src/App';

const app = dva();
app.model(model);

app.router(() => <App />);

AppRegistry.registerComponent('manager', () => app.start());
