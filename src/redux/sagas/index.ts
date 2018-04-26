import { fork } from 'redux-saga/effects';

import appSaga from './app';

function* rootSaga() {
    'use strict';
    yield [fork(appSaga)];
}

export default rootSaga;
