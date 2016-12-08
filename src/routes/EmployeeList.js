import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { ListView, List } from 'antd-mobile';
import { Actions } from 'react-native-router-flux';

class EmployeeList extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return (
      <List.Item
        onClick={() => Actions.employeeEdit({ employee })}
        extra="More"
        arrow="horizontal"
      >
        {employee.name}
      </List.Item>
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = ({ Employee }) => {
  const employees = _.map(Employee.list, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};

export default connect(mapStateToProps)(EmployeeList);
