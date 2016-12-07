import React from 'react';
import { Text } from 'react-native';
import { connect } from 'dva/mobile';
import firebase from 'firebase';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  ActivityIndicator,
  List
} from 'antd-mobile';

function LoginForm({ email, password, error, loading, dispatch }) {

  function componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.checkUserLogin(user);
    });
  }

  function onEmailChange(text) {
    dispatch({
      type: 'Auth/emailChanged',
      payload: text,
    });
  }

  function onPasswordChange(text) {
    dispatch({
      type: 'Auth/passwordChanged',
      payload: text,
    });
  }

  function onLogin() {
    dispatch({
      type: 'Auth/loginUser',
      payload: { email, password }
    });
  }

  function renderButton() {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button type="primary" onClick={onLogin}>
        Login
      </Button>
    );
  }

  return (
    <List>
      <InputItem
        clear
        value={email}
        onChange={onEmailChange}
        placeholder="email.gmail.com"
        labelNumber={5}
      >
        Email
      </InputItem>

      <InputItem
        clear
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="password"
        labelNumber={5}
      >
        Password
      </InputItem>

      <WingBlank>
        <Text style={styles.errorTextStyle}>
          {error}
        </Text>

        {renderButton()}
        <WhiteSpace />
      </WingBlank>
    </List>
  );
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ Auth }) => {
  const { email, password, error, loading } = Auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps)(LoginForm);
