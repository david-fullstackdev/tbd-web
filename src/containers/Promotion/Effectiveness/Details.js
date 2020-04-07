import React from 'react';
import styled from 'styled-components';
import Select, { SelectOption as Option } from 'components/uielements/select';
import SimpleTable from 'components/uielements/simpleTable';

const DetailsWrapper = styled.div`
  display: flex;
  margin: 15px 0;
`;

const Column = styled.div`
  padding: 0 10px;
  flex-grow: 1;
  
  .ant-table-content {
    border-top: 1px solid #e9e9e9;
  }
`;

const ColumnTitle = styled.h4`
  margin-bottom: 15px;
`;

const baseColumns = [
  { dataIndex: 'label' },
  { dataIndex: 'value' },
];

const baseData = [
  { label: '% Base Volume', value: '90.2%' },
  { label: '% Incremental Volume', value: '9.8%' },
  { label: 'Base Volume', value: '50,481,661' },
  { label: 'Incremental Volume', value: '5,461,206' },
];

const promotedData = [
  { label: '% Promoted Volume', value: '49.1%' },
  { label: '% Non-Promoted Volume', value: '50.9%' },
  { label: 'Promoted Volume', value: '27,495,016' },
  { label: 'Non-Promoted Volume', value: '28,447,851' },
];

const Details = () => (
  <DetailsWrapper>
    <Column>
      <ColumnTitle>Lift / Efficiency Analysis</ColumnTitle>
      <Select style={{ width: '100%' }} value="">
        <Option value="">Total Lift</Option>
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
      </Select>
    </Column>
    <Column>
      <ColumnTitle>Base & Incremental Volume</ColumnTitle>
      <SimpleTable
        showHeader={false}
        showFooter={false}
        data={baseData}
        columns={baseColumns}
      />
    </Column>
    <Column>
      <ColumnTitle>Promoted & Non-Promoted Volume</ColumnTitle>
      <SimpleTable
        showHeader={false}
        showFooter={false}
        data={promotedData}
        columns={baseColumns}
      />
    </Column>
  </DetailsWrapper>
);

export default Details;