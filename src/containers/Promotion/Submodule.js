import React from 'react';
import { connect } from 'react-redux';
import { getActiveCategory } from 'redux/categories/selectors';

const Submodule = ({ match, category }) => (
  <div>
    <pre>
        {JSON.stringify(category, null, 2)}
      </pre>
    <pre>
      {JSON.stringify(match, null, 2)}
    </pre>
  </div>
);

export default connect(
  state => ({ category: getActiveCategory(state) })
)(Submodule);