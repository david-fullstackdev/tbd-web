import React from 'react';
import { connect } from 'react-redux';
import { getUserReferencesTables } from 'redux/admin/selectors';
import { Table } from 'antd';

const categoriesColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Display Name', dataIndex: 'display_name', key: 'display_name' },
];

const modulesColumns = [
  { title: 'Module', dataIndex: 'module', key: 'module' },
  { title: 'Display Name', dataIndex: 'display_name', key: 'display_name' },
];

const ExpandedRow = ({ modules, categories }) => (
  <div>
    <h2>Modules</h2>
    <Table
      rowKey="module"
      columns={modulesColumns}
      dataSource={modules}
      pagination={false}
    />
    <br/>
    <h2>Categories</h2>
    <Table
      rowKey="id"
      columns={categoriesColumns}
      dataSource={categories}
      pagination={false}
    />
  </div>
);

export default connect(getUserReferencesTables)(ExpandedRow);