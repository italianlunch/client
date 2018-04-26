import { Reducer } from 'redux';

import ACTIONS from './actionList';

interface AppState {
    isSenderAccountValid: {
        success: any;
        error: any;
    };

    isReceiverAccountValid: {
        success: any;
        error: any;
    };

    sendTransactionStatus: {
        success: any;
        error: any;
    };
}

const APP_INITIAL_STATE: AppState = {
    isSenderAccountValid: null as any,
    isReceiverAccountValid: null as any,
    sendTransactionStatus: null as any,
};

const appReducer: Reducer<AppState> = (
    state = APP_INITIAL_STATE,
    action = { type: '', payload: null as any }
) => {
    switch (action.type) {
        case ACTIONS.VALIDATE_SENDER_ACCOUNT_ERROR:
            return {
                ...state,
                isSenderAccountValid: {
                    success: null,
                    error: action.payload,
                },
            };

        case ACTIONS.VALIDATE_SENDER_ACCOUNT_SUCCESS:
            return {
                ...state,
                isSenderAccountValid: {
                    success: action.payload,
                    error: null,
                },
            };

        case ACTIONS.VALIDATE_RECEIVER_ACCOUNT_ERROR:
            return {
                ...state,
                isReceiverAccountValid: {
                    success: null,
                    error: action.payload,
                },
            };

        case ACTIONS.VALIDATE_RECEIVER_ACCOUNT_SUCCESS:
            return {
                ...state,
                isReceiverAccountValid: {
                    success: action.payload,
                    error: null,
                },
            };

        case ACTIONS.SEND_TRANSACTION_ERROR:
            return {
                ...state,
                sendTransactionStatus: {
                    success: null,
                    error: action.payload,
                },
            };

        case ACTIONS.SEND_TRANSACTION_SUCCESS:
            return {
                ...state,
                sendTransactionSuccess: {
                    success: action.payload,
                    error: null,
                },
            };

        default:
            return state;
    }
};

export { AppState, appReducer };
