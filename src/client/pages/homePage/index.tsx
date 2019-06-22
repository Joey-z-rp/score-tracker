import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getAllShooters as getAllShootersAction } from "../../actions/shooter";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
    getAllShooters: () => dispatch(getAllShootersAction()),
});

class HomePage extends React.Component<any> {
    componentDidMount() {
        this.props.getAllShooters();
    }

    render() {
        return (
            <div>
                shooter list here
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
