import React from 'react';
import shuffle from 'lodash/shuffle';
import Toggle from './Toggle.js';
import IntlMessages from 'components/utility/intlMessages';
import PropTypes from 'prop-types';

const Header = ({
  view,
  order,
  sortingMethod,
  toggleList,
  toggleGrid,
  toggleSort,
  sortShuffle,
  sortRotate
}) => (
  <header className="isoControlBar">
    <div className="isoViewBtnGroup">
      <Toggle
        clickHandler={toggleList}
        text={<IntlMessages id="toggle.list" />}
        icon="bars"
        active={view === 'list'}
      />
      <Toggle
        clickHandler={toggleGrid}
        text={<IntlMessages id="toggle.grid" />}
        icon="appstore"
        active={view === 'grid'}
      />
    </div>

    <div className="isoControlBtnGroup">
      <Toggle
        clickHandler={toggleSort}
        text={
          order === 'asc' ? (
            <IntlMessages id="toggle.ascending" />
          ) : (
            <IntlMessages id="toggle.descending" />
          )
        }
        icon={order === 'asc' ? 'up' : 'down'}
        active={sortingMethod === 'chronological'}
      />
    </div>
  </header>
);

Header.propsTypes = {
  view: PropTypes.string.isRequred,
  order: PropTypes.string.isRequred,
  sortingMethod: PropTypes.string.isRequred,
  toggleList: PropTypes.func.isRequired,
  toggleGrid: PropTypes.func.isRequired,
  toggleSort: PropTypes.func.isRequired,
  sortShuffle: PropTypes.func.isRequired,
  sortRotate: PropTypes.func.isRequired,
};

export default Header;