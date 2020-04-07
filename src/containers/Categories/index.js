import React from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from 'helpers/AsyncFunc';

class Categories extends React.Component {
  render() {
    const { url } = this.props.match;
    return (
      <div>
        <Route
          exact
          path={`${url}/:category`}
          component={asyncComponent(() => import('./Item/CategoryDetails.js'))}
        />
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('./List/CategoriesList.js'))}
        />
      </div>
    );
  }
}

export default Categories;