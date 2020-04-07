import React, { Component } from 'react';
import clone from 'clone';
import TableWrapper from 'containers/Tables/antTables/antTable.style';
import { DeleteCell } from 'containers/Tables/antTables/helperCells';

export default class CustomizedView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.createColumns(clone(this.props.tableInfo.columns)),
      dataList: this.props.dataList,
    };
  }

  createColumns(columns) {
    columns.push({
      title: '',
      dataIndex: 'actions',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.props.onRowEdit(record)}>Edit</a> {' '}
          <DeleteCell index={index} onDeleteCell={this.props.onRowDelete} />
        </div>,
    });

    return columns;
  }

  render() {
    const { columns } = this.state;
    const { rowKey, dataList } = this.props;

    return (
      <TableWrapper
        rowKey={rowKey}
        columns={columns}
        dataSource={dataList}
        className="isoEditableTable"
      />
    );
  }
}
