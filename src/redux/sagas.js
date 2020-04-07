import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import adminSagas from './admin/sagas';
import calendarSagas from './calendar/saga';
import categorySagas from './categories/saga';
import contactSagas from './contacts/saga';
import mailSagas from './mail/saga';
import modulesSagas from './modules/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';
import cardsSagas from './card/saga';
import youtubeSearchSagas from './youtubeSearch/sagas';
import devSagas from 'customApp/redux/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    adminSagas(),
    calendarSagas(),
    categorySagas(),
    contactSagas(),
    mailSagas(),
    modulesSagas(),
    notesSagas(),
    todosSagas(),
    cardsSagas(),
    youtubeSearchSagas(),
    devSagas()
  ]);
}
