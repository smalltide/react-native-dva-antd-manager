import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import {
  WhiteSpace,
  WingBlank,
  Button,
  List,
  Modal,
  Flex
} from 'antd-mobile';
import { employeeUpdate, employeeSave, employeeDelete, clearEmployeeForm } from '../actions';
import EmployeeForm from '../components/EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    this.props.clearEmployeeForm();
  }

  onSaveButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    text(phone, `Your upcoming shift is on ${shift}`);
  }

  onDeleteButtonPress() {
    this.setState({ showModal: !this.state.showModal });
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <List>
        <EmployeeForm />
        <WingBlank>
          <WhiteSpace />
          <Button type="primary" onClick={this.onSaveButtonPress.bind(this)}>
            Save
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.onDeleteButtonPress.bind(this)}>
            Delete Employee
          </Button>
          <WhiteSpace />
        </WingBlank>

        <Modal
          style={{ height: 100, width: 350 }}
          title="Are you sure you want to delete this?"
          transparent
          visible={this.state.showModal}
        >
          <WingBlank>
            <WhiteSpace size="sm" />
            <Flex>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                <Button type="primary" inline onClick={this.onAccept.bind(this)}>Yes</Button>
              </Flex.Item>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                <Button type="primary" inline onClick={this.onDecline.bind(this)}>No</Button>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </Modal>
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete, clearEmployeeForm
})(EmployeeEdit);
