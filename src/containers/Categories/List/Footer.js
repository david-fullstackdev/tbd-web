import React from 'react';
import Toggle from './Toggle.js';
import IntlMessages from 'components/utility/intlMessages';
import PropTypes from 'prop-types';

const Footer = ({
  canAdd,
  canRemove,
  moveArticle,
}) => (
  <footer key="foot" className="isoAddRemoveControlBar">
    <div className="isoControlBtnGroup">
      <Toggle
        clickHandler={() => moveArticle('removedArticles', 'articles')}
        text={<IntlMessages id="toggle.addItem" />}
        icon="plus"
        active={canAdd}
      />
      <Toggle
        clickHandler={() => moveArticle('articles', 'removedArticles')}
        text={<IntlMessages id="toggle.removeItem" />}
        icon="close"
        active={canRemove}
      />
    </div>
  </footer>
);

Footer.propTypes = {
  canAdd: PropTypes.bool,
  canRemove: PropTypes.bool,
  moveArticle: PropTypes.func.isRequired,
};

export default Footer;