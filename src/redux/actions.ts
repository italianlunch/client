import ACTIONS from './actionList';

type ValidateTransactionDestination = (
    payload: string
) => { type: string; payload: string };

const validateTransactionDestination: ValidateTransactionDestination = payload => ({
    type: ACTIONS.VALIDATE_TRANSACTION_DESTINATION,
    payload,
});

type ValidateTransactionDestinationSuccess = (
    payload: any
) => { type: string; payload: any };

const validateTransactionDestinationSuccess: ValidateTransactionDestinationSuccess = payload => ({
    type: ACTIONS.VALIDATE_TRANSACTION_DESTINATION_SUCCESS,
    payload,
});

type ValidateTransactionDestinationError = (
    payload: any
) => { type: string; payload: any };

const validateTransactionDestinationError: ValidateTransactionDestinationError = payload => ({
    type: ACTIONS.VALIDATE_TRANSACTION_DESTINATION_ERROR,
    payload,
});

type SendTransaction = (
    payload: { tx: string }
) => { type: string; payload: { tx: string } };

const sendTransaction: SendTransaction = payload => ({
    type: ACTIONS.SEND_TRANSACTION,
    payload,
});

export {
    validateTransactionDestination,
    ValidateTransactionDestination,
    validateTransactionDestinationError,
    validateTransactionDestinationSuccess,
    sendTransaction,
};
