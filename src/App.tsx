import * as React from 'react';

interface OwnState {
    form: {
        sourcePrivateKey: string;
        destinationPublicKey: string;
        amount: string;
    };
    message: string;
}

class App extends React.Component<{}, OwnState> {
    constructor(props: {}) {
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

    send = () => {
        fetch('http://localhost:4000/send-lumens', {
            method: 'post',
            body: JSON.stringify(this.state.form),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(response => {
            console.log(response);
            this.setState({
                ...this.state,
                message: 'transaction sent!',
            });
        });
    };

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
                    />
                    <input
                        value={this.state.form.amount}
                        placeholder={'Amount'}
                        onChange={this.setFormField('amount')}
                    />
                    <button onClick={this.send}>Send</button>
                </div>
                {this.state.message && <div>{this.state.message}</div>}
            </div>
        );
    }
}

export default App;
