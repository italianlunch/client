import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    validateTransactionDestination,
    ValidateTransactionDestination,
} from './redux/actions';
import { ReduxState } from './redux/rootReducer';

interface OwnState {
    form: {
        sourcePrivateKey: string;
        destinationPublicKey: string;
        amount: string;
    };
    message: string;
}

interface ReduxStateProps {
    validateDestinationPublicKey: any;
}

interface ReduxDispatchProps {
    validateTransactionDestination: ValidateTransactionDestination;
}

type AllProps = ReduxStateProps & ReduxDispatchProps;

class App extends React.Component<AllProps, OwnState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            form: {
                sourcePrivateKey: '',
                destinationPublicKey: '',
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
                        value={this.state.form.sourcePrivateKey}
                        placeholder={'Source key'}
                        onChange={this.setFormField('sourcePrivateKey')}
                    />
                    <input
                        value={this.state.form.destinationPublicKey}
                        placeholder={'Destination key'}
                        onChange={this.setFormField('destinationPublicKey')}
                        onBlur={() =>
                            this.state.form.destinationPublicKey &&
                            this.props.validateTransactionDestination(
                                this.state.form.destinationPublicKey
                            )
                        }
                    />
                    <div>
                        {this.props.validateDestinationPublicKey &&
                            this.props.validateDestinationPublicKey.success}
                        {this.props.validateDestinationPublicKey &&
                            this.props.validateDestinationPublicKey.error}
                    </div>
                    <input
                        value={this.state.form.amount}
                        placeholder={'Amount'}
                        onChange={this.setFormField('amount')}
                    />
                    {/* <button onClick={this.send}>Send</button> */}
                </div>
                {this.state.message && <div>{this.state.message}</div>}
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxState): ReduxStateProps => ({
    validateDestinationPublicKey: state.app.validateDestinationPublicKey,
});

const mapDispatchToProps = (dispatch: any): ReduxDispatchProps => ({
    validateTransactionDestination: bindActionCreators(
        validateTransactionDestination,
        dispatch
    ),
});

export default connect<ReduxStateProps, ReduxDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(App);
