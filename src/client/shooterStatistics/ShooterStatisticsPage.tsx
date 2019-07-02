import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import DividerComponent from '@material-ui/core/Divider';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import GroupSizes from './components/groupSizes';
import { getGroupSizes as getGroupSizesAction } from './shooterStatisticsActions';
import { IState } from '../redux/types';

const Divider = styled(DividerComponent)`
    margin: 1rem 0;
`;

const ShooterStatistics = ({
    getGroupSizes,
    groupSizes,
    isFetchingGroupSizes,
    match,
}) => {
    useEffect(() => {
        const shooterId = match.params.shooterId;
        getGroupSizes(shooterId);
    }, []);

    if (isFetchingGroupSizes) return <CircularProgress />;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4">Shooter Statistics</Typography>
            <Typography variant="h5">Shooter Name placeholder</Typography>
            <Divider />
            <GroupSizes groupSizesData={groupSizes} isFetching={isFetchingGroupSizes} />
        </Container>
    );
};

const mapStateToProps = (state: IState) => ({
    groupSizes: state.shooterStatistics.groupSizes,
    isFetchingGroupSizes: state.shooterStatistics.isFetchingGroupSizes,
});

const mapDispatchToProps = (dispatch: any) => ({
    getGroupSizes: (shooterId: number) => dispatch(getGroupSizesAction(shooterId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShooterStatistics));
