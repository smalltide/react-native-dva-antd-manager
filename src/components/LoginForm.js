import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {
  WhiteSpace,
  WingBlank,
  InputItem,
  Button,
  ActivityIndicator,
  List
} from 'antd-mobile';

import { emailChanged, passwordChanged, loginUser, checkUserLogin } from '../actions';

class LoginForm extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.checkUserLogin(user);
    });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <Button type="primary" onClick={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <List>
        <InputItem
          clear
          value={this.props.email}
          onChange={this.onEmailChange.bind(this)}
          placeholder="email.gmail.com"
          labelNumber={5}
        >
          Email
        </InputItem>

        <InputItem
          clear
          type="password"
          value={this.props.password}
          onChange={this.onPasswordChange.bind(this)}
          placeholder="password"
          labelNumber={5}
        >
          Password
        </InputItem>

        <WingBlank>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          {this.renderButton()}
          <WhiteSpace />
        </WingBlank>
      </List>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, checkUserLogin
})(LoginForm);
