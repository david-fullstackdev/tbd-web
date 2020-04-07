import React from 'react';
import module from 'helpers/module';
import asyncComponent from 'helpers/AsyncFunc';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Menu from 'components/uielements/menu';

const menu = [
  { id: 'promotional-effectiveness', label: 'Promotional Effectiveness' },
  { id: 'brand-analysis', label: 'Brand Analysis' },
  { id: 'item-analysis', label: 'Item Analysis' },
  { id: 'due-to-analysis', label: 'Due to Analysis' },
  { id: 'simulation', label: 'Simulation' },
];


class Promotion extends React.Component {
  render() {
    const { match } = this.props;
    const { url, params } = match;
    const baseUrl = url.replace('/' + params.submodule, '');

    return (
      <div>
        <Menu mode="horizontal" selectedKeys={[params.submodule]}>
          {menu.map((item) => (
            <Menu.Item key={item.id}>
              <Link to={`${baseUrl}/${item.id}`}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Switch>
          <Route
            exact
            path={`${baseUrl}/simulation`}
            component={asyncComponent(() => import('./Simulation'))}
          />
          <Route
            exact
            path={`${baseUrl}/promotional-effectiveness`}
            component={asyncComponent(() => import('./Effectiveness'))}
          />
          <Route
            path={`${baseUrl}/:submodule`}
            component={asyncComponent(() => import('./Submodule'))}
          />
          <Redirect to={`${baseUrl}/promotional-effectiveness`} />
        </Switch>
      </div>
    );
  }
}

export default module('promotion')(Promotion);