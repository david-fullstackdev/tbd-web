import React from 'react';
import styled from 'styled-components';
import { reduce, isEqual, uniq, cloneDeep } from 'lodash';
import { Popconfirm } from 'antd';
import Input from 'components/uielements/input';
import SimpleTable from 'components/uielements/simpleTable';

const identity = val => val;

const EditableCell = ({
  editable,
  value,
  formatter = identity,
  onChange
}) => (
  <div>
    {!editable
      ? formatter(value, onChange)
      : <Input
          style={{ margin: '-5px 0' }}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
    }
  </div>
);

const ActionsCell = styled.div`
  a {
    margin-right: 8px;
  }
`;

const getChangedProps = (a, b) => reduce(a, (result, value, key) =>
  isEqual(value, b[key]) ? result : result.concat(key), []);

const SaveActions = ({ record, onSave, onCancel }) => (
  <ActionsCell>
    <a onClick={() => onSave(record.key)}>Save</a>
    <Popconfirm title="Sure to cancel?" onConfirm={() => onCancel(record.key)}>
      <a>Cancel</a>
    </Popconfirm>
  </ActionsCell>
);

const EditActions = ({ record, onEdit, onUndo }) => (
  <ActionsCell>
    <a onClick={() => onEdit(record.key)}>Edit</a>
    {record.canUndo && (
      <Popconfirm title="Sure to undo?" onConfirm={() => onUndo(record.key)}>
        <a>Undo</a>
      </Popconfirm>
    )}
  </ActionsCell>
);

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      ...props.columns.map(col => Object.assign({}, col, {
        render: (text, record) => this.renderColumns(text, record, col),
      })),
      {
        title: 'Operation',
        dataIndex: 'operation',
        width: 100,
        render: (text, record) => record.editable
          ? <SaveActions record={record} onSave={this.save} onCancel={this.cancel} />
          : <EditActions record={record} onEdit={this.edit} onUndo={this.undo} />
      }
    ];

    this.state = {
      data: props.data,
      changes: props.changes || {},
    };

    this.cacheData = cloneDeep(props.data);
    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.undo = this.undo.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillReceiveProps({ data }) {
    const prevData = this.state.data;

    if (data.length !== prevData.length || data[0] !== prevData[0]) {
      this.setState({ data });
    }
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable && !column.readonly}
        value={text}
        formatter={column.formatter}
        onChange={value => this.handleChange(value, record.key, column.dataIndex)}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  handleSave(data) {
    this.setState(data);
    this.props.onSave(data);
  }

  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }

  save(key) {
    const { data, changes } = this.state;
    const newData = [...data];
    const target = newData.filter(item => key === item.key)[0];
    const cached = this.cacheData.filter(item => key === item.key)[0];
    if (target) {
      const changed = getChangedProps(cached, target);
      delete target.editable;
      target.canUndo = true;

      this.cacheData = cloneDeep(newData);
      this.handleSave({
        changes: Object.assign(changes, {
          [key]: uniq(changed.concat(changes[key])),
        }),
      });
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  undo(key) {
    const { data, changes } = this.state;
    const newData = [...data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      const source = this.props.cache.filter(item => key === item.key)[0];
      Object.assign(target, source);
      delete target.canUndo;

      this.handleSave({
        changes: Object.assign(changes, {
          [key]: undefined,
        }),
      });
    }
  }

  render() {
    return (
      <SimpleTable
        data={this.state.data}
        columns={this.columns}
        rowSelection={this.props.rowSelection}
        onChange={this.props.onChange}
      />
    );
  }
}

export default EditableTable;