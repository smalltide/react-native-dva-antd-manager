import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';

import Auth from './src/models/Auth';
import Employee from './src/models/Employee';
import Router from './src/Router';

const app = dva();
app.model(Auth);
app.model(Employee);


app.router(() => <Router />);

AppRegistry.registerComponent('manager', () => app.start());
