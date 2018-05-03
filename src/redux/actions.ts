import { Status } from '../types';
import ACTIONS from './actionList';

type ValidateSenderAccount = (
    payload: string
) => { type: string; payload: string };

const validateSenderAccount: ValidateSenderAccount = payload => ({
    type: ACTIONS.VALIDATE_SENDER_ACCOUNT,
    payload,
});

type SetSenderAccountValidity = (
    payload: Status
) => { type: string; payload: Status };

const setSenderAccountValidity: SetSenderAccountValidity = payload => ({
    type: ACTIONS.SET_SENDER_ACCOUNT_VALIDITY,
    payload,
});

type ValidateReceiverAccount = (
    payload: string
) => { type: string; payload: string };

const validateReceiverAccount: ValidateReceiverAccount = payload => ({
    type: ACTIONS.VALIDATE_RECEIVER_ACCOUNT,
    payload,
});

type SetReceiverAccountValidity = (
    payload: Status
) => { type: string; payload: Status };

const setReceiverAccountValidity: SetReceiverAccountValidity = payload => ({
    type: ACTIONS.SET_RECEIVER_ACCOUNT_VALIDITY,
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

type SetTransactionStatus = (
    payload: Status
) => { type: string; payload: Status };

const setTransactionStatus: SetTransactionStatus = payload => ({
    type: ACTIONS.SET_TRANSACTION_STATUS,
    payload,
});

export {
    setReceiverAccountValidity,
    SetReceiverAccountValidity,
    setSenderAccountValidity,
    SetSenderAccountValidity,
    setTransactionStatus,
    SetTransactionStatus,
    sendTransaction,
    SendTransaction,
    validateReceiverAccount,
    ValidateReceiverAccount,
    validateSenderAccount,
    ValidateSenderAccount,
};
