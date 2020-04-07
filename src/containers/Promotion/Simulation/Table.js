import React from 'react';
import styled from 'styled-components';
import { cloneDeep, reduce, uniq, pick, sortBy, reverse } from 'lodash';
import EditableTable from 'components/uielements/editableTable';
import SimpleTable from 'components/uielements/simpleTable';
import Truncate from 'components/uielements/truncate';
import Switch from 'components/uielements/switch';
import { InputSearch } from 'components/uielements/input';
import Button from 'components/uielements/button';

const TableWrapper = styled.div`
  flex-grow: 1;
  margin-left: 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Col = styled.div`
  width: 200px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  
  button {
    margin-left: 15px;
  }
`;

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    product: `Product With a Large Name ${i}`,
    como: 'No',
    custom_base_units: 0,
    custom_base_price: 0,
    simulated_base_price: 0,
    promoted_asp: 0,
  });
}

const dataCache = cloneDeep(data);
const price = value => `$${value}`;
const productName = value => <Truncate>{value}</Truncate>;

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'product',
    readonly: true,
    formatter: productName,
    sorter: true,
  },
  {
    title: 'Como.?',
    dataIndex: 'como',
    width: 80,
    sorter: true,
  },
  {
    title: 'Custom Base Units',
    dataIndex: 'custom_base_units',
    width: 80,
    sorter: true,
  },
  {
    title: 'Custom Base Price',
    dataIndex: 'custom_base_price',
    formatter: price,
    width: 80,
    sorter: true,
  },
  {
    title: 'Simulated Base Price',
    dataIndex: 'simulated_base_price',
    formatter: price,
    width: 80,
    sorter: true,
  },
  {
    title: 'Promoted ASP',
    dataIndex: 'promoted_asp',
    formatter: price,
    width: 80,
    sorter: true,
  },
];

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewMode: false,
      simulation: false,
      search: '',
      sort: {
        field: 'key',
        order: 'ascend',
      },
      preview: {
        data: [],
        rows: [],
        changes: {},
      }
    };

    this.handlePreview = this.handlePreview.bind(this);
    this.enablePreview = this.enablePreview.bind(this);
    this.disablePreview = this.disablePreview.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSimulation = this.handleSimulation.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  getPreviewColumns() {
    const { changes } = this.state.preview;
    const cols = uniq(reduce(changes, (result, items) => result.concat(items), []));

    return columns;
    //if (cols.length === 0) return columns;

    return columns.filter(col => col.dataIndex === 'product' || cols.includes(col.dataIndex));
  }

  getPreviewData() {
    const { rows } = this.state.preview;
    const previewColumns = this.getPreviewColumns();
    const selectColumns = previewColumns.map(col => col.dataIndex).concat('key');

    return data
      .filter(row => rows.includes(row.key))
      .map(row => pick(row, selectColumns))
  }

  handlePreview(previewMode) {
    this.setState({ previewMode });
  }

  handleSearch({ target }) {
    this.setState({ search: target.value });
  }

  handleTableChange(pagination, filters, sorter) {
    this.setState({
      sort: {
        order: sorter.order || 'ascend',
        field: sorter.field || 'key',
      }
    })
  }

  handleUpdate({ changes }) {
    const { preview } = this.state;
    const rows = uniq(Object.keys(changes).filter(row => changes[row]).concat(preview.rows));
    const nextPreview = { rows, changes };

    this.setState({ preview: nextPreview });
  }

  handleSelectChange(keys) {
    const { preview } = this.state;
    this.setState({ preview: Object.assign({}, preview, { rows: keys }) })
  }

  handleSimulation() {
    this.setState({ simulation: true });
    console.log(this.getPreviewData());
    alert('Simulation running');
  }

  enablePreview() {
    this.handlePreview(true);
  }

  disablePreview() {
    this.handlePreview(false);
  }

  getDisplayData() {
    const { search, sort } = this.state;
    const searchQuery = new RegExp(search, 'gi');
    const sortedData = sortBy(data, sort.field);
    const displayData = sort.order === 'ascend' ? sortedData : reverse(sortedData);

    return search.length
      ? displayData.filter(row => row.product.search(searchQuery) >= 0)
      : displayData;
  }

  renderEditable() {
    const { preview } = this.state;
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys: preview.rows,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: this.handleSelectChange,
      }, {
        key: 'edited',
        text: 'Select Only Edited',
        onSelect: () => this.handleSelectChange(
          Object
            .keys(preview.changes)
            .filter(row => preview.changes[row])
        ),
      }],
      onChange: this.handleSelectChange,
    };

    return (
      <div>
        <EditableTable
          columns={columns}
          data={this.getDisplayData()}
          cache={dataCache}
          changes={preview.changes}
          rowSelection={rowSelection}
          onSave={this.handleUpdate}
          onChange={this.handleTableChange}
        />
        <Footer>
          <Button type="primary" onClick={this.enablePreview}>
            Simulation
          </Button>
        </Footer>
      </div>
    )
  }

  renderPreview() {
    const { simulation } = this.state;
    const previewData = this.getPreviewData();
    const previewColumns = this.getPreviewColumns()
      .map(({ formatter, ...col }) => Object.assign({ render: formatter }, col));

    return (
      <div>
        <SimpleTable
          data={previewData}
          columns={previewColumns}
        />
        <Footer>
          {simulation || <Button onClick={this.disablePreview}>
            Cancel and Make Changes
          </Button>}
          <Button
            type="primary"
            disabled={!previewData.length}
            onClick={this.handleSimulation}
          >
            Submit Simulation
          </Button>
        </Footer>
      </div>
    );
  }

  render() {
    const { previewMode, search } = this.state;
    return (
      <TableWrapper>
        <Header>
          <Col>
            <Switch
              checked={previewMode}
              onChange={this.handlePreview}
            /> Preview
          </Col>
          {previewMode || (
            <Col>
              <InputSearch
                value={search}
                onChange={this.handleSearch}
              />
            </Col>
          )}
        </Header>
        {previewMode ? this.renderPreview() : this.renderEditable()}
      </TableWrapper>
    );
  }
}

export default Table;