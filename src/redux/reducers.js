import Admin from './admin/reducer';
import App from './app/reducer';
import Auth from './auth/reducer';
import Mails from './mail/reducer';
import Calendar from './calendar/reducer';
import Categories from './categories/reducer';
import Box from './box/reducer';
import Notes from './notes/reducer';
import Todos from './todos/reducer';
import Contacts from './contacts/reducer';
import Cards from './card/reducer';
import DynamicChartComponent from './dynamicEchart/reducer';
import Ecommerce from './ecommerce/reducer';
import Modules from './modules/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import YoutubeSearch from './youtubeSearch/reducers';
import DevReducers from 'customApp/redux/reducers';

export default {
  Admin,
  App,
  Auth,
  Box,
  Calendar,
  Cards,
  Categories,
  Contacts,
  DynamicChartComponent,
  Ecommerce,
  LanguageSwitcher,
  Mails,
  Modules,
  Notes,
  ThemeSwitcher,
  Todos,
  YoutubeSearch,
  ...DevReducers
};
