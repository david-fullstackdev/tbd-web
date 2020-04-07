import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from 'components/uielements/menu';
import SidebarWrapper from './sidebar.style';

import appActions from 'redux/app/actions';
import modulesActions from 'redux/modules/actions';
import Logo from 'components/utility/logo';
import { rtl } from 'config/withDirection';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchModules();
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0',
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { url, app, isAdmin, toggleOpenDrawer, customizedTheme, modules } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };

    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              <Menu.Item key="home">
                <Link to={`${url}/home`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-home" />
                    <span className="nav-text">
                      Home
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              {isAdmin && (
                <SubMenu
                  key="admin"
                  title={
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-gear-b" />
                      <span className="nav-text">
                        Admin
                      </span>
                    </span>
                  }
                >
                  <Menu.Item style={submenuStyle} key="categories">
                    <Link style={submenuColor} to={`${url}/admin/categories`}>
                      Manage Categories
                    </Link>
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="users">
                    <Link style={submenuColor} to={`${url}/admin/users`}>
                      Manage Users
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}

              {modules.map(module => (
                <Menu.Item key={module.module}>
                  <Link to={`${url}/${module.module}`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-cube"/>
                      <span className="nav-text">
                        {module.display_name}
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    isAdmin: state.Auth.get('isAdmin'),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
    modules: state.Modules.get('list').toArray(),
  }),
  {
    toggleOpenDrawer,
    changeOpenKeys,
    changeCurrent,
    toggleCollapsed,
    fetchModules: modulesActions.fetchList
  }
)(Sidebar);
