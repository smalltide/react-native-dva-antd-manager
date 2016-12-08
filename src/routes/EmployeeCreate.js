import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import {
  WhiteSpace,
  WingBlank,
  Button,
  List
} from 'antd-mobile';
import EmployeeForm from '../components/EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.dispatch({
      type: 'Employee/createEmployee',
      payload: { name, phone, shift }
    });
  }

  render() {
    return (
      <List>
        <EmployeeForm />
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </WingBlank>
        <WhiteSpace />
      </List>
    );
  }
}

const mapStateToProps = ({ Employee }) => {
  const { name, phone, shift } = Employee.form;

  return { name, phone, shift };
};

export default connect(mapStateToProps)(EmployeeCreate);
