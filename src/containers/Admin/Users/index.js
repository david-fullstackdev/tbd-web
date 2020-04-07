import React from 'react';
import { connect } from 'react-redux';
import usersActions from 'redux/admin/users/actions';
import categoriesActions from 'redux/admin/categories/actions';
import modulesActions from 'redux/admin/modules/actions';
import usersModulesActions from 'redux/admin/users_modules/actions';
import usersCategoriesActions from 'redux/admin/users_categories/actions';
import Button from 'components/uielements/button';
import styled from 'styled-components';
import { DateCell, ImageCell, LinkCell, TextCell } from 'containers/Tables/antTables/helperCells';
import Table from './Table';
import Modal from './Modal';
import ExpandedRow from './ExpandedRow';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const renderCell = (object, type, key) => {
  const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value);
    default:
      return TextCell(value);
  }
};

const expandedRowRender = (record) => <ExpandedRow record={record}/>;

const columns = [
  {
    title: 'ID',
    key: 'id',
    width: 50,
    render: object => renderCell(object, 'TextCell', 'id')
  },
  {
    title: 'Email',
    key: 'email',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'email')
  },
  {
    title: 'First Name',
    key: 'first_name',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'first_name')
  },
  {
    title: 'Last Name',
    key: 'last_name',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'last_name')
  }
];

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      record: {},
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchModules();
    this.props.fetchCategories();
    this.props.fetchUsersModules();
    this.props.fetchUsersCategories();
  }

  showModal = () => this.setState({ modalVisible: true });
  hideModal = () => this.setState({ modalVisible: false });

  createRecord = () => {
    this.showModal();
    this.setState({ record: {} })
  };

  editRecord = (record) => {
    this.showModal();
    this.setState({ record });
  };

  deleteRecord = (recordIndex) => {
    const { deleteUser, list } = this.props;
    deleteUser(list[recordIndex].id);
  };

  saveRecord = (record) => {
    this.props.saveUser(record);
    this.hideModal();
  };

  render() {
    const { modalVisible, record } = this.state;
    const { loading, list, progress } = this.props;

    return (
      <div>
        <HeaderWrapper>
          <h1>Users</h1>
          <Button type="primary" onClick={this.createRecord}>Add User</Button>
        </HeaderWrapper>
        {(modalVisible || progress) && <Modal
          record={record}
          progress={progress}
          onCancel={this.hideModal}
          onSave={this.saveRecord}
        />}
        {loading
          ? 'Loading...'
          : <Table
            rowKey="id"
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataList={list}
            onRowEdit={this.editRecord}
            onRowDelete={this.deleteRecord}
          />}
      </div>
    );
  }
}

export default connect(
  (state) => state.Admin.Users.toJSON(),
  {
    fetchUsers: usersActions.fetchList,
    fetchModules: modulesActions.fetchList,
    fetchCategories: categoriesActions.fetchList,
    fetchUsersModules: usersModulesActions.fetchList,
    fetchUsersCategories: usersCategoriesActions.fetchList,
    saveUser: usersActions.saveUser,
    deleteUser: usersActions.deleteUser,
  }
)(Users);