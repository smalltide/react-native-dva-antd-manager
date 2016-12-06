import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  InputItem,
  List
} from 'antd-mobile';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <InputItem
          clear
          value={this.props.name}
          placeholder="Jane"
          onChange={value => this.props.employeeUpdate({ prop: 'name', value })}
        >Name</InputItem>

        <InputItem
          clear
          value={this.props.phone}
          placeholder="123-456-789"
          onChange={value => this.props.employeeUpdate({ prop: 'phone', value })}
        >Phone</InputItem>

        <List.Item style={{ flex: 0 }}>
          <View>
            <Text style={styles.pickerTextStyle}>Shift</Text>
            <Picker
              selectedValue={this.props.shift}
              onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </View>
        </List.Item>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingTop: 10
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
