import ACTIONS from './actionList';

type ValidateSenderAccount = (
    payload: string
) => { type: string; payload: string };

const validateSenderAccount: ValidateSenderAccount = payload => ({
    type: ACTIONS.VALIDATE_SENDER_ACCOUNT,
    payload,
});

type ValidateSenderAccountSuccess = (
    payload: any
) => { type: string; payload: any };

const validateSenderAccountSuccess: ValidateSenderAccountSuccess = payload => ({
    type: ACTIONS.VALIDATE_SENDER_ACCOUNT_SUCCESS,
    payload,
});

type ValidateSenderAccountError = (
    payload: any
) => { type: string; payload: any };

const validateSenderAccountError: ValidateSenderAccountError = payload => ({
    type: ACTIONS.VALIDATE_SENDER_ACCOUNT_ERROR,
    payload,
});

type ValidateReceiverAccount = (
    payload: string
) => { type: string; payload: string };

const validateReceiverAccount: ValidateReceiverAccount = payload => ({
    type: ACTIONS.VALIDATE_RECEIVER_ACCOUNT,
    payload,
});

type ValidateReceiverAccountSuccess = (
    payload: any
) => { type: string; payload: any };

const validateReceiverAccountSuccess: ValidateReceiverAccountSuccess = payload => ({
    type: ACTIONS.VALIDATE_RECEIVER_ACCOUNT_SUCCESS,
    payload,
});

type ValidateReceiverAccountError = (
    payload: any
) => { type: string; payload: any };

const validateReceiverAccountError: ValidateReceiverAccountError = payload => ({
    type: ACTIONS.VALIDATE_RECEIVER_ACCOUNT_ERROR,
    payload,
});

type SendTransaction = (
    payload: {
        senderPrivateKey: string;
        receiverPublicKey: string;
        amount: string;
    }
) => {
    type: string;
    payload: {
        senderPrivateKey: string;
        receiverPublicKey: string;
        amount: string;
    };
};

const sendTransaction: SendTransaction = payload => ({
    type: ACTIONS.SEND_TRANSACTION,
    payload,
});

type SendTransactionSuccess = (payload: any) => { type: string; payload: any };

const sendTransactionSuccess: SendTransactionSuccess = payload => ({
    type: ACTIONS.SEND_TRANSACTION_SUCCESS,
    payload,
});

type SendTransactionError = (payload: any) => { type: string; payload: any };

const sendTransactionError: SendTransactionError = payload => ({
    type: ACTIONS.SEND_TRANSACTION_ERROR,
    payload,
});

export {
    validateSenderAccount,
    ValidateSenderAccount,
    validateSenderAccountSuccess,
    validateSenderAccountError,
    validateReceiverAccount,
    ValidateReceiverAccount,
    validateReceiverAccountSuccess,
    validateReceiverAccountError,
    sendTransaction,
    SendTransaction,
    sendTransactionSuccess,
    sendTransactionError,
};
