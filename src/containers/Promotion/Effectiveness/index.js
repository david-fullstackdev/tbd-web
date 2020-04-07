import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Wrapper, Header, Title, Content } from 'components/promotion/layout';
import { getActiveCategory } from 'redux/categories/selectors';
import random from 'lodash/random';
import DateSlider from 'components/uielements/dateSlider';
import Filters from 'containers/Promotion/Simulation/Filters';
import Details from './Details';
import Chart, { ChartLegend } from './Chart';


const SubTitle = styled.span`
  color: #31769b;
  font-size: 0.8rem;
`;

const MainContent = styled.div`
  max-width: calc(100% - 250px);
  margin-right: 15px;
`;

const ChartDescription = styled.div`
  display: flex;
  margin-top: 15px;

  > * {
    width: 50%;
    padding-right: 15px;
  }

  .legend > .legend {
    display: block !important;
    max-width: 200px;
  }
`;

const minDate = '2017-08-06T00:00:00.000Z';
const maxDate = '2018-06-29T00:00:00.000Z';

const data = [];
const startTime = new Date(2016, 7, 1).getTime();
const size = 52;
const generate = (date, prev) => {
  const baseSales = prev.sales + random(-100, 100);
  const sales = baseSales < 0 ? 0 : baseSales;
  const impacts = random(-20, 0);

  return ({
    date,
    tpr: sales + Math.abs(impacts) * 2,
    sales,
    impacts,
  });
};

for (let i = 0; i < size; i++) {
  const date = new Date(startTime + i * 7 * 24 * 3600 * 1000);
  const prev = data[i - 1] || {
    tpr: 0,
    sales: 0,
    impacts: 0,
  };

  data.push(generate(date, prev));
}

const Submodule = ({ category }) => {
  return (
    <Wrapper>
      <Header>
        <div>
          <Title>Promotion Analysis: <strong>{category.display_name}</strong></Title>
          <SubTitle>Start by selecting from the filter options on the right</SubTitle>
        </div>
        <div>
          <DateSlider
            style={{ width: 250 }}
            min={minDate}
            max={maxDate}
            labels={['Start Analysis', 'End Analysis']}
          />
        </div>
      </Header>
      <Content>
        <MainContent>
          <h3>
            Promotion's 10.8% total sales lift reflects 5,461,206 additional volume sold;
            19.9% sales made with a promotion were 'new' -- driven exclusively by promotion.
          </h3>
          <Details />
          <Chart data={data} />
          <ChartDescription>
            <small>
              <strong>Copyright 2016.</strong> 
            </small>
            <div>
              <strong>Due To Impact</strong>
              <ChartLegend />
            </div>
          </ChartDescription>
        </MainContent>
        <Filters />
      </Content>
    </Wrapper>
  );
};

export default connect(
  state => ({ category: getActiveCategory(state) })
)(Submodule);
