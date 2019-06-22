import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
});

class HomePage extends React.Component<any> {
    render() {
        return (
            <div>
                shooter list here
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
