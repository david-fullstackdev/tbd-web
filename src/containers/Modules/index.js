import React from 'react';
import { connect } from 'react-redux';
import { getActiveModule } from 'redux/modules/selectors';
import { getActiveCategory } from 'redux/categories/selectors';
import LayoutWrapper from 'components/utility/layoutWrapper';
import LayoutContent from 'components/utility/layoutContent';

class Modules extends React.Component {
  renderContent() {
    return (
      <div>
        Category: {this.props.category.display_name}
      </div>
    )
  }

  renderWarning() {
    return (
      <div>
        Please make a category selection in order to view {this.props.module.display_name}
      </div>
    );
  }

  render() {
    const { category, module } = this.props;

    if (!module) return null;

    return (
      <LayoutWrapper>
        <LayoutContent>
          <h1>{module.display_name}</h1>
          {category ? this.renderContent() : this.renderWarning()}
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  (state, props) => ({
    category: getActiveCategory(state),
    module: getActiveModule(state, props)
  })
)(Modules);