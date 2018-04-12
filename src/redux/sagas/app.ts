import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import * as StellarSdk from 'stellar-sdk';

StellarSdk.Network.useTestNetwork();
const stellar = new StellarSdk.Server('https://horizon-testnet.stellar.org');

import ACTIONS from '../actionList';
import {
    validateTransactionDestinationError,
    validateTransactionDestinationSuccess,
} from '../actions';

const validateTransactionDestinationPublicKey = async (
    publicKey: string
): Promise<any> => {
    try {
        await stellar.loadAccount(publicKey);
        return 'success!';
    } catch (err) {
        throw new Error('Destination public key is invalid.');
    }
};

function* validateTransactionDestinationSaga(action: any): any {
    'use strict';
    const payload = action.payload;
    try {
        const response = yield call(
            validateTransactionDestinationPublicKey,
            payload
        );
        yield put(validateTransactionDestinationSuccess(response));
    } catch (error) {
        yield put(validateTransactionDestinationError(error.message));
    }
}

function* watchValidateTransactionDestination() {
    'use strict';
    yield takeEvery(
        ACTIONS.VALIDATE_TRANSACTION_DESTINATION,
        validateTransactionDestinationSaga
    );
}

export default function* appSaga() {
    'use strict';
    yield [fork(watchValidateTransactionDestination)];
}
