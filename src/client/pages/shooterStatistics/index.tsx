import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import DividerComponent from '@material-ui/core/Divider';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GroupSizes from './components/groupSizes';
import { capitalizeEachWord } from '../../../common/utils/string';
import { convertToDisplayFormat } from '../../../common/utils/date';
import { getGroupSizes as getGroupSizesAction } from '../../actions/shooterStatistics';
import { IState } from '../../interfaces/store';

const Divider = styled(DividerComponent)`
    margin: 1rem 0;
`;

class HomePage extends React.Component<any> {
    componentDidMount() {
        const shooterId = this.props.match.params.shooterId;
        this.props.getGroupSizes(shooterId);
    }

    render() {
        const {
            groupSizes,
            isFetchingGroupSizes,
        } = this.props;
        
        if (isFetchingGroupSizes) return <CircularProgress />;

        const convertedGroupSizes = groupSizes.map(groupSize =>({
            date: new Date(groupSize.date),
            groupSizeInMM: Number(groupSize.groupSizeInMM),
        })).sort((a, b) => a.date - b.date).map((groupSize, index) => ({
            ...groupSize,
            index: index + 1,
        }));

        return (
            <Container maxWidth="lg">
                <Typography variant="h4">Shooter Statistics</Typography>
                <Divider />
                <GroupSizes groupSizesData={convertedGroupSizes}/>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    groupSizes: state.shooterStatistics.groupSizes,
    isFetchingGroupSizes: state.shooterStatistics.isFetchingGroupSizes,
});

const mapDispatchToProps = (dispatch: any) => ({
    getGroupSizes: (shooterId: number) => dispatch(getGroupSizesAction(shooterId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
