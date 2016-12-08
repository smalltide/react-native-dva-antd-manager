import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { create, remove, update, doWatchList } from '../services/Employee';

const INITIAL_STATE = {
  modalVisible: false,
  form: {
    name: '',
    phone: '',
    shift: ''
  },
  list: {}
};

export default {
  namespace: 'Employee',
  state: { ...INITIAL_STATE },
  reducers: {
    fetchSuccess(state, action) {
      return { ...state, list: action.payload };
    },
    formUpdate(state, action) {
      const { prop, value } = action.payload;
      const newForm = { ...state.form, [prop]: value };
      return { ...state, form: newForm };
    },
    clearForm(state) {
      return { ...state, form: INITIAL_STATE.form };
    },
    showModal(state) {
      return { ...state, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    }
  },
  effects: {
    * createEmployee({ payload }, { call, put }) {
      const { name, phone, shift } = payload;
      const { err } = yield call(create, { name, phone, shift });

      if (!err) {
        yield put({ type: 'clearForm' });
        Actions.employeeList({ type: 'reset' });
      }
    },
    * deleteEmployee({ payload }, { call, put }) {
      const { uid } = payload;

      yield put({ type: 'hideModal' });
      const { err } = yield call(remove, uid);

      if (!err) {
        Actions.employeeList({ type: 'reset' });
      }
    },
    * updateEmployee({ payload }, { call }) {
      const { uid, name, phone, shift } = payload;
      const { err } = yield call(update, uid, { name, phone, shift });

      if (!err) {
        Actions.employeeList({ type: 'reset' });
      }
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          doWatchList((val) => {
            dispatch({ type: 'fetchSuccess', payload: val });
          });
          Actions.main();
        } else {
          Actions.auth();
        }
      });
    }
  }
};
