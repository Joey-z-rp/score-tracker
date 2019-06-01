import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadData } from "../../actions/load"; 

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

class HomePage extends React.Component<any> {
    componentDidMount() {
        loadData();
    }

    render() {
        return (
            <div>Home Page</div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
