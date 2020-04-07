import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 50px 35px;
`;

class CategoryDetails extends React.Component {
  render() {
    return (
      <Wrapper>
        <h1>CATEGORY DETAILS</h1>
        {this.props.match.params.category}
      </Wrapper>
    );
  }
}

export default CategoryDetails;