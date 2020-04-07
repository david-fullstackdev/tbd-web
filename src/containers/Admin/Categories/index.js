import React from 'react';
import { connect } from 'react-redux';
import actions from 'redux/admin/categories/actions';
import Button from 'components/uielements/button';
import styled from 'styled-components';
import { DateCell, ImageCell, LinkCell, TextCell } from 'containers/Tables/antTables/helperCells';
import Table from './Table';
import Modal from './Modal';

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

const columns = [
  {
    title: 'ID',
    key: 'id',
    width: 50,
    render: object => renderCell(object, 'TextCell', 'id')
  },
  {
    title: 'Category',
    key: 'category',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'category')
  },
  {
    title: 'Display Name',
    key: 'display_name',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'display_name')
  }
];

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      record: {},
    };
  }

  componentWillMount() {
    this.props.fetchList();
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
    const { deleteCategory, list } = this.props;
    deleteCategory(list[recordIndex].id);
  };

  saveRecord = (record) => {
    this.props.saveCategory(record);
    this.hideModal();
  };

  render() {
    const { modalVisible, record } = this.state;
    const { loading, list, progress } = this.props;

    return (
      <div>
        <HeaderWrapper>
          <h1>Categories</h1>
          <Button type="primary" onClick={this.createRecord}>Add Category</Button>
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
            tableInfo={{ columns }}
            dataList={list}
            onRowEdit={this.editRecord}
            onRowDelete={this.deleteRecord}
          />}
      </div>
    );
  }
}

export default connect(
  (state) => state.Admin.Categories.toJSON(),
  {
    fetchList: actions.fetchList,
    saveCategory: actions.saveCategory,
    deleteCategory: actions.deleteCategory,
  }
)(Categories);