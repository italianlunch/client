import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import * as StellarSdk from 'stellar-sdk';

StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

import ACTIONS from '../actionList';
import {
    sendTransactionError,
    sendTransactionSuccess,
    validateReceiverAccountError,
    validateReceiverAccountSuccess,
    validateSenderAccountError,
    validateSenderAccountSuccess,
} from '../actions';

const validatePublicKey = async (publicKey: string): Promise<any> => {
    try {
        await server.loadAccount(publicKey);
        return 'Success!';
    } catch (err) {
        throw new Error('Invalid Public Key.');
    }
};

const validatePrivateKey = async (privateKey: string): Promise<any> => {
    try {
        const publicKey = StellarSdk.Keypair.fromSecret(privateKey).publicKey();
        return await validatePublicKey(publicKey);
    } catch (err) {
        throw new Error('Invalid Private Key.');
    }
};

const sendTransaction = async (
    privateKey: string,
    publicKey: string,
    amount: string
): Promise<any> => {
    console.log(publicKey, privateKey, amount);
    const senderPublicKey = StellarSdk.Keypair.fromSecret(
        privateKey
    ).publicKey();
    const senderAccount = await server.loadAccount(senderPublicKey);
    const senderKeys = StellarSdk.Keypair.fromSecret(privateKey);

    const transaction = new StellarSdk.TransactionBuilder(senderAccount)
        .addOperation(
            StellarSdk.Operation.payment({
                destination: publicKey,
                asset: StellarSdk.Asset.native(),
                amount,
            })
        )
        .addMemo(StellarSdk.Memo.text('Testing stuff'))
        .build();

    transaction.sign(senderKeys);

    try {
        return await server.submitTransaction(transaction);
    } catch (e) {
        throw new Error('Transaction failed');
    }
};

function* validateSenderAccountSaga(action: any): any {
    'use strict';
    const payload = action.payload;
    try {
        const response = yield call(validatePrivateKey, payload);
        yield put(validateSenderAccountSuccess(response));
    } catch (error) {
        yield put(validateSenderAccountError(error.message));
    }
}

function* validateReceiverAccountSaga(action: any): any {
    'use strict';
    const payload = action.payload;
    try {
        const response = yield call(validatePublicKey, payload);
        yield put(validateReceiverAccountSuccess(response));
    } catch (error) {
        yield put(validateReceiverAccountError(error.message));
    }
}

function* sendTransactionSaga(action: any): any {
    'use strict';
    const payload = action.payload;
    try {
        const response = yield call(
            sendTransaction,
            payload.senderPrivateKey,
            payload.receiverPublicKey,
            payload.amount
        );
        yield put(sendTransactionSuccess(response));
    } catch (error) {
        yield put(sendTransactionError(error.message));
    }
}

function* watchValidateSenderAccount() {
    'use strict';
    yield takeEvery(ACTIONS.VALIDATE_SENDER_ACCOUNT, validateSenderAccountSaga);
}

function* watchValidateReceiverAccount() {
    'use strict';
    yield takeEvery(
        ACTIONS.VALIDATE_RECEIVER_ACCOUNT,
        validateReceiverAccountSaga
    );
}

function* watchSendTransaction() {
    'use strict';
    yield takeEvery(ACTIONS.SEND_TRANSACTION, sendTransactionSaga);
}

export default function* appSaga() {
    'use strict';
    yield [
        fork(watchValidateSenderAccount),
        fork(watchValidateReceiverAccount),
        fork(watchSendTransaction),
    ];
}
