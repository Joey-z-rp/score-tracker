import * as React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { syncShooter } from "./synchronizeDataActions"; 

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
    syncShooter: (shooterId: number) => dispatch(syncShooter(shooterId)),
});

const Synchronize = ({ syncShooter }) => {
    const [input, setInput] = useState("");
    const synchronizeShooter = () => syncShooter(input);

    return (
        <div>
            <div>Sync shooter:</div>
            <input
                type="text"
                value={input}
                onChange={event => setInput(event.target.value)}
            />
            <button onClick={synchronizeShooter}>Sync</button>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Synchronize));
