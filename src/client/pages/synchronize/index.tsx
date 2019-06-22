import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { syncShooter } from "../../actions/synchronizeData"; 

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
    syncShooter: (shooterId: number) => dispatch(syncShooter(shooterId)),
});

class Synchronize extends React.Component<any> {
    state = {
        input: "",
    };

    sync = () => {
        this.props.syncShooter(this.state.input);
    };

    render() {
        return (
            <div>
                <div>Sync shooter:</div>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={event => this.setState({ input: event.target.value })}
                />
                <button onClick={this.sync}>Sync</button>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Synchronize));
