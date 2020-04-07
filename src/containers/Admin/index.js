import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from 'helpers/AsyncFunc';
import LayoutContentWrapper from 'components/utility/layoutWrapper';
import LayoutContent from 'components/utility/layoutContent';


export default class extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Route
            exact
            path={`${url}/categories`}
            component={asyncComponent(() => import('./Categories/index.js'))}
          />
          <Route
            exact
            path={`${url}/users`}
            component={asyncComponent(() => import('./Users/index.js'))}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
