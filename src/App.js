import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import reducers from './reducers';
import Router from './Router';

class App extends Component {

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyASDo8VyrO5wCB0_LseaIxeRK931jf-lMQ',
      authDomain: 'react-native-manager-4c69f.firebaseapp.com',
      databaseURL: 'https://react-native-manager-4c69f.firebaseio.com',
      storageBucket: 'react-native-manager-4c69f.appspot.com',
      messagingSenderId: '881318924131'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
