import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
const INITIAL_STATE = {};

export default {
  namespace: 'Employee',
  state: { ...INITIAL_STATE },
  reducers: {
    fetchSuccess(state, action) {

      return action.payload;
    }
  },
  effects: {
    * fetch({ payload }, { call, put }) {

    }
  },
  subscriptions: {
    setup({ dispatch }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          doWatchList((val) => {
            dispatch({ type: 'fetchSuccess', payload: val });
          });
        }
      });
    }
  }
};
//put({ type: 'fetchSuccess', payload: snapshot.val() });
function doWatchList(callback) {
  const { currentUser } = firebase.auth();
  const ref = firebase.database().ref(`/users/${currentUser.uid}/employees`);

  const handler = (snapshot) => {
    callback(snapshot.val());
  };

  ref.on('value', handler);

  return () => {
    ref.off('value', handler);
  };
}
