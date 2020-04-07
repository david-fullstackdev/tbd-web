import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import registerServiceWorker from './registerServiceWorker';
import themes from './config/themes';
import DashApp from './dashApp';
import AppLocale from './languageProvider';
import config, {
  getCurrentLanguage,
} from './containers/LanguageSwitcher/config';
import { themeConfig } from 'config.js';
import DashAppHolder from './dashAppStyle';
// import 'antd/dist/antd.css';

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];
ReactDOM.render(
  <LocaleProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <DashAppHolder>
          <DashApp />
        </DashAppHolder>
      </ThemeProvider>
    </IntlProvider>
  </LocaleProvider>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./dashApp.js', () => {
    const NextApp = require('./dashApp').default;
    ReactDOM.render(<NextApp />, document.getElementById('root'));
  });
}
registerServiceWorker();
export { AppLocale };
