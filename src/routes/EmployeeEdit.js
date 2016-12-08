import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { text } from 'react-native-communications';
import {
  WhiteSpace,
  WingBlank,
  Button,
  List,
  Modal,
  Flex
} from 'antd-mobile';
import EmployeeForm from '../components/EmployeeForm';

class EmployeeEdit extends Component {
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.dispatch({
        type: 'Employee/formUpdate',
        payload: { prop, value }
      });
    });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'Employee/clearForm' });
  }

  onSaveButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.dispatch({
      type: 'Employee/updateEmployee',
      payload: { name, phone, shift, uid: this.props.employee.uid }
    });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    text(phone, `Your upcoming shift is on ${shift}`);
  }

  onDeleteButtonPress() {
     this.props.dispatch({ type: 'Employee/showModal' });
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.dispatch({
      type: 'Employee/deleteEmployee',
      payload: { uid }
    });
  }

  onDecline() {
    this.props.dispatch({ type: 'Employee/hideModal' });
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
          visible={this.props.modalVisible}
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

const mapStateToProps = ({ Employee }) => {
  const { name, phone, shift } = Employee.form;

  return { name, phone, shift, modalVisible: Employee.modalVisible };
};

export default connect(mapStateToProps)(EmployeeEdit);
