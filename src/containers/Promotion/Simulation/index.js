import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getActiveCategory } from 'redux/categories/selectors';
import { Wrapper, Header, Title, Content } from 'components/promotion/layout';
import DateSlider from 'components/uielements/dateSlider';
import Filters from './Filters';
import Table from './Table';

const SubTitle = Title.extend`
  font-size: 0.9rem;
`;

const Description = styled.div`
  white-space: pre-wrap;
`;

const desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisl mi, bibendum euismod molestie et, lacinia quis nunc. Maecenas eu ultricies quam, vitae interdum odio. Curabitur luctus vehicula elit id feugiat. Proin aliquet arcu sit amet dapibus dictum. Aliquam erat volutpat. Donec sit amet sem bibendum, suscipit ipsum id, tempus enim. Integer velit orci, imperdiet in ante non, tristique lacinia ex. Phasellus ut nunc augue. Donec urna nisi, facilisis vitae arcu id, cursus iaculis nisi. Donec posuere, urna a dignissim porttitor, nulla lacus faucibus augue, sed pharetra enim diam et urna. Morbi et libero convallis purus tempor porttitor et quis mi. Vivamus elementum lorem sit amet lobortis facilisis. In tempus sapien sit amet libero aliquam, sit amet lacinia nibh egestas. Nulla facilisi.

Vivamus et magna nec odio suscipit placerat id nec elit. Duis in maximus purus. Aliquam mollis eleifend nunc id rutrum. Maecenas efficitur elit tempor, tristique sem eu, pulvinar neque. Sed nec ornare sem, et luctus enim. Maecenas aliquam ante diam, eget maximus tellus posuere sed. Cras faucibus mollis nulla, vitae tincidunt eros auctor sit amet. Fusce nisl eros, cursus sed tortor a, congue vestibulum nisi. Donec feugiat nulla leo, vitae placerat mauris aliquet nec. Vivamus consectetur urna non libero sagittis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque at dignissim dolor. Nunc metus urna, auctor nec fermentum vel, ullamcorper in arcu.

Nam congue sem accumsan dui elementum, eget sodales arcu volutpat. Aliquam sed sapien nec tellus aliquam convallis. Aliquam erat volutpat. Aliquam porttitor vitae felis ac molestie. Nam feugiat imperdiet lectus vulputate lobortis. Praesent dapibus congue purus, eu tristique diam finibus eget. Nullam fermentum, dolor euismod porta mollis, tortor nunc ornare risus, vel pellentesque purus elit eu quam. Vivamus eros nisl, laoreet in ligula sit amet, tristique accumsan diam. Nulla vitae diam a urna commodo scelerisque. Nulla auctor, enim sit amet egestas ullamcorper, ante nunc porttitor elit, eget lacinia est augue eget orci. Nullam vestibulum dui quis quam vulputate, quis finibus lorem scelerisque. Sed malesuada tempus placerat. Suspendisse interdum nisi ullamcorper massa interdum, a malesuada quam faucibus.`;

const minDate = '2017-08-06T00:00:00.000Z';
const maxDate = '2018-06-29T00:00:00.000Z';

const Submodule = ({ category }) => {
  return (
    <Wrapper>
      <Header>
        <div>
          <Title>Promotion Simulator: <strong>{category.display_name}</strong></Title>
          <SubTitle>How to use this tool:</SubTitle>
        </div>
        <div>
          <DateSlider
            style={{ width: 250 }}
            min={minDate}
            max={maxDate}
            labels={['Start Analysis', 'End Analysis']}
            disabled
          />
        </div>
      </Header>
      <Description>{desc}</Description>
      <Content>
        <Filters />
        <Table />
      </Content>
    </Wrapper>
  );
};

export default connect(
  state => ({ category: getActiveCategory(state) })
)(Submodule);