import { Reducer } from 'redux';

import { Status } from '../types';
import ACTIONS from './actionList';

interface AppState {
    senderAccountValid: Status;
    receiverAccountValid: Status;
    transactionStatus: Status;
}

const APP_INITIAL_STATE: AppState = {
    senderAccountValid: 'inactive',
    receiverAccountValid: 'inactive',
    transactionStatus: 'inactive',
};

const appReducer: Reducer<AppState> = (
    state = APP_INITIAL_STATE,
    action = { type: '', payload: null as any }
) => {
    switch (action.type) {
        case ACTIONS.SET_RECEIVER_ACCOUNT_VALIDITY:
            return {
                ...state,
                receiverAccountValid: action.payload,
            };

        case ACTIONS.SET_SENDER_ACCOUNT_VALIDITY:
            return {
                ...state,
                senderAccountValid: action.payload,
            };

        case ACTIONS.SET_TRANSACTION_STATUS:
            return {
                ...state,
                transactionStatus: action.payload,
            };

        default:
            return state;
    }
};

export { AppState, appReducer };
