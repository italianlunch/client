import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    sendTransaction,
    SendTransaction,
    validateReceiverAccount,
    ValidateReceiverAccount,
    validateSenderAccount,
    ValidateSenderAccount,
} from './redux/actions';
import { ReduxState } from './redux/rootReducer';

interface OwnState {
    form: {
        senderPrivateKey: string;
        receiverPublicKey: string;
        amount: string;
    };
    message: string;
}

interface ReduxStateProps {
    isSenderAccountValid: any;
    isReceiverAccountValid: any;
    sendTransactionStatus: any;
}

interface ReduxDispatchProps {
    validateSenderAccount: ValidateSenderAccount;
    validateReceiverAccount: ValidateReceiverAccount;
    sendTransaction: SendTransaction;
}

type AllProps = ReduxStateProps & ReduxDispatchProps;

class App extends React.Component<AllProps, OwnState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            form: {
                senderPrivateKey: '',
                receiverPublicKey: '',
                amount: '',
            },
            message: '',
        };
    }

    setFormField = (fieldName: string) => (event: any) => {
        this.setState({
            form: {
                ...this.state.form,
                [fieldName]: event.target.value,
            },
        });
    };

    render() {
        return (
            <div>
                <div>
                    <h1>Send ur lumens</h1>
                    <input
                        value={this.state.form.senderPrivateKey}
                        placeholder={'Your Private Key'}
                        onChange={this.setFormField('senderPrivateKey')}
                        onBlur={() =>
                            this.state.form.senderPrivateKey &&
                            this.props.validateSenderAccount(
                                this.state.form.senderPrivateKey
                            )
                        }
                    />
                    <input
                        value={this.state.form.receiverPublicKey}
                        placeholder={"Your Friend's Public key"}
                        onChange={this.setFormField('receiverPublicKey')}
                        onBlur={() =>
                            this.state.form.receiverPublicKey &&
                            this.props.validateReceiverAccount(
                                this.state.form.receiverPublicKey
                            )
                        }
                    />
                    <div>
                        {this.props.isReceiverAccountValid &&
                            this.props.isReceiverAccountValid.success}
                        {this.props.isReceiverAccountValid &&
                            this.props.isReceiverAccountValid.error}
                        {this.props.isSenderAccountValid &&
                            this.props.isSenderAccountValid.success}
                        {this.props.isSenderAccountValid &&
                            this.props.isSenderAccountValid.error}
                    </div>
                    <input
                        value={this.state.form.amount}
                        placeholder={'Amount'}
                        onChange={this.setFormField('amount')}
                    />
                    {
                        <button
                            onClick={() =>
                                this.props.sendTransaction(this.state.form)
                            }
                        >
                            Send
                        </button>
                    }
                </div>
                {this.state.message && <div>{this.state.message}</div>}
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxState): ReduxStateProps => ({
    isSenderAccountValid: state.app.isSenderAccountValid,
    isReceiverAccountValid: state.app.isReceiverAccountValid,
    sendTransactionStatus: state.app.sendTransactionStatus,
});

const mapDispatchToProps = (dispatch: any): ReduxDispatchProps => ({
    validateSenderAccount: bindActionCreators(validateSenderAccount, dispatch),
    validateReceiverAccount: bindActionCreators(
        validateReceiverAccount,
        dispatch
    ),
    sendTransaction: bindActionCreators(sendTransaction, dispatch),
});

export default connect<ReduxStateProps, ReduxDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(App);
