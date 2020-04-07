import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getActiveModule } from 'redux/modules/selectors';
import { getActiveCategory } from 'redux/categories/selectors';
import LayoutWrapper from 'components/utility/layoutWrapper';
import LayoutContent from 'components/utility/layoutContent';

const moduleWrapper = (BaseComponent) => class extends React.Component {
  renderWarning() {
    return (
      <div>
        Please make a category selection in order to view {this.props.module.display_name}
      </div>
    );
  }

  renderContent() {
    return <BaseComponent {...this.props} />;
  }

  render() {
    const { module, category } = this.props;

    if (!module) return null;

    return (
      <LayoutWrapper>
        <LayoutContent>
          {category ? this.renderContent() : this.renderWarning()}
        </LayoutContent>
      </LayoutWrapper>
    );
  }
};

export default (id) => compose(
  connect(
    (state) => ({
      category: getActiveCategory(state),
      module: getActiveModule(state, { match: { params: { module: id } } })
    })
  ),
  moduleWrapper,
);