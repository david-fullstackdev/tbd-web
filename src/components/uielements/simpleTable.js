import React from 'react';
import PropTypes from 'prop-types';
import Table from 'components/uielements/table';

const drawFooter = (data) => () => <div>{data.length} records</div>;

const SimpleTable = ({ data, columns, showFooter = true, ...props }) => (
  <Table
    bordered
    pagination={false}
    scroll={{ y: 400 }}
    footer={showFooter ? drawFooter(data) : undefined}
    dataSource={data}
    columns={columns}
    {...props}
  />
);

SimpleTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default SimpleTable;