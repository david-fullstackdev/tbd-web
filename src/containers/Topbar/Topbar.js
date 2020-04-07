import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from 'redux/app/actions';
import categoriesAction from 'redux/categories/actions';
import TopbarWrapper from './topbar.style';
import { TopbarSearch, TopbarUser } from 'components/topbar';
import Select, { SelectOption } from 'components/uielements/select';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  handleCategorySelect = (value) => {
    this.props.selectCategory(Number(value));
  };

  render() {
    const { toggleCollapsed, customizedTheme, categories, activeCategory } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    // const padLeft = collapsed ? "89px" : "265px";
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70
      // padding: "0 31px 0 0",
      // paddingLeft: padLeft,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="isoRight">
            <li>
              <Select
                style={{ width: 140 }}
                placeholder="Select Category"
                value={[activeCategory]}
                onChange={this.handleCategorySelect}
              >
                {categories.map(item => (
                  <SelectOption key={item.id} value={String(item.id)}>{item.display_name}</SelectOption>
                ))}
              </Select>
            </li>

            <li className="isoSearch">
              <TopbarSearch />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
    categories: state.Categories.get('list').toArray(),
    activeCategory: String(state.Categories.get('active')),
  }),
  {
    toggleCollapsed,
    fetchCategories: categoriesAction.fetchList,
    selectCategory: categoriesAction.selectCategory,
  }
)(Topbar);
