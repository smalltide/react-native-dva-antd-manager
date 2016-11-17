import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';

import reducers from './reducers';

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
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Text>
            Hello!!
          </Text>
        </View>
      </Provider>
    );
  }
}

export default App;
