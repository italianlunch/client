import { Reducer } from 'redux';

import ACTIONS from './actionList';

interface AppState {
    validateDestinationPublicKey: {
        success: any;
        error: any;
    };
}

const APP_INITIAL_STATE: AppState = {
    validateDestinationPublicKey: null as any,
};

const appReducer: Reducer<AppState> = (
    state = APP_INITIAL_STATE,
    action = { type: '', payload: null as any }
) => {
    switch (action.type) {
        case ACTIONS.VALIDATE_TRANSACTION_DESTINATION_ERROR:
            return {
                ...state,
                validateDestinationPublicKey: {
                    success: null,
                    error: action.payload,
                },
            };

        case ACTIONS.VALIDATE_TRANSACTION_DESTINATION_SUCCESS:
            return {
                ...state,
                validateDestinationPublicKey: {
                    success: action.payload,
                    error: null,
                },
            };

        default:
            return state;
    }
};

export { AppState, appReducer };
