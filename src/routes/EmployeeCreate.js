import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  WhiteSpace,
  WingBlank,
  Button,
  List
} from 'antd-mobile';
import { employeeCreate } from '../actions';
import EmployeeForm from '../components/EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
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

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeCreate })(EmployeeCreate);
