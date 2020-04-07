import React from 'react';
import styled from 'styled-components';
import Filters, { FilterItem } from 'components/uielements/filters';

const FiltersContainer = styled.div`
  flex-basis: 250px;
`;

const geography = [
  { value: '', label: 'Total US' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const options = [
  { value: '', label: '(All)' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

class SimulationFilters extends React.Component {
  render() {
    return (
      <FiltersContainer>
        <Filters>
          <FilterItem
            label="Geography"
            type="select"
            options={geography}
            value=""
          />
          <FilterItem
            label="Style"
            type="select"
            options={options}
            value=""
          />
          <FilterItem
            label="Band Type"
            type="select"
            options={options}
            value=""
          />
          <FilterItem
            label="Wireless Capabilities"
            type="select"
            options={options}
            value=""
          />
          <FilterItem
            label="Brand"
            type="select"
            options={options}
            value=""
          />
          <FilterItem
            label="Price Point"
            type="range"
            range={[4.96, 403.97]}
          />
        </Filters>
      </FiltersContainer>
    );
  }
}

export default SimulationFilters;