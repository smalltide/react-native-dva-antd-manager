import firebase from 'firebase';
import { signInWithEmailAndPassword } from '../services/Employee';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default {
  namespace: 'Auth',
  state: { ...INITIAL_STATE },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true, error: '' };
    },
    emailChanged(state, action) {
      return { ...state, email: action.payload };
    },
    passwordChanged(state, action) {
      return { ...state, password: action.payload };
    },
    loginSuccess(state, action) {
      return { ...state, ...INITIAL_STATE, user: action.payload };
    },
    loginFail(state) {
      return { ...state, error: 'Authentication Failed.', loading: false };
    }
  },
  effects: {
    * loginUser({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });

      const { email, password } = payload;
      const { user, err } = yield call(signInWithEmailAndPassword, email, password);

      if (user) {
        yield put({ type: 'loginSuccess', payload: user });
      } else if (err) {
        yield put({ type: 'loginFail' });
      }
    }
  },
  subscriptions: {
    setup() {
      const config = {
        apiKey: 'AIzaSyASDo8VyrO5wCB0_LseaIxeRK931jf-lMQ',
        authDomain: 'react-native-manager-4c69f.firebaseapp.com',
        databaseURL: 'https://react-native-manager-4c69f.firebaseio.com',
        storageBucket: 'react-native-manager-4c69f.appspot.com',
        messagingSenderId: '881318924131'
      };
      firebase.initializeApp(config);
    }
  }
};
