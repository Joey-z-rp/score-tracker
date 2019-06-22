import * as React from 'react';
import Autorenew from '@material-ui/icons/Autorenew';
import Avatar from '@material-ui/core/Avatar';
import CardActionAreaComponent from '@material-ui/core/CardActionArea';
import CardComponent from '@material-ui/core/Card';
import CardContentComponent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import DividerComponent from '@material-ui/core/Divider';
import Error from '@material-ui/icons/Error';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { capitalizeEachWord } from '../../../common/utils/string';
import { convertToDisplayFormat } from '../../../common/utils/date';
import { getAllShooters as getAllShootersAction } from '../../actions/shooter';
import { IState, IConvertedShooter } from '../../interfaces/store';
import { SyncStatus } from '../../../common/constants/database';

const Divider = styled(DividerComponent)`
    margin: 1rem 0;
`;

const Card = styled(CardComponent)`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
`;

const CardActionArea = styled(CardActionAreaComponent)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    text-align: center;
`;

const CardContent = styled(CardContentComponent)`
    text-align: center;
`;

const CheckCircle = styled(CheckCircleIcon)`
    color: #28a745;
`;

class HomePage extends React.Component<any> {
    componentDidMount() {
        this.props.getAllShooters();
    }

    render() {
        const {
            isFetchingShooters,
            shooters,
        } = this.props;
        
        if (isFetchingShooters) return <CircularProgress />;

        const createShooterCard = (shooter: IConvertedShooter) => {
            const createHeader = content => <Typography variant="h5">{content}</Typography>;
            const createSubHeader = content => (
                <Typography variant="body2" color="textSecondary" component="p">
                    {content}
                </Typography>
            );
            const createStatus = (syncStatus: SyncStatus) => {
                let title;
                let icon;

                switch (syncStatus) {
                    case SyncStatus.Succeeded:
                        title = 'Succeeded';
                        icon = <CheckCircle fontSize="large" />;
                        break;

                    case SyncStatus.Failed:
                        title = 'Failed';
                        icon = <Error fontSize="large" color="error" />;
                        break;

                    case SyncStatus.Creating:
                    case SyncStatus.Synchronizing:
                        title = 'In Progress';
                        icon = <Autorenew fontSize="large" color="action" />;
                        break;

                    default:
                        return;
                }

                return (
                    <Tooltip title={title}>
                        {icon}
                    </Tooltip>
                );
            };
            const createContentBlock = (header, subHeader) => (
                <CardContent>
                    {createHeader(header)}
                    {createSubHeader(subHeader)}
                </CardContent>
            );

            return (
                <Card key={shooter.shooterId}>
                    <CardActionArea>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="avatar">
                                    {(shooter.name || "").charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            subheader={`Shooter ID: ${shooter.shooterId}`}
                            title={capitalizeEachWord(shooter.name)}
                            titleTypographyProps={{ variant: 'h5' }}
                        />
                        {createContentBlock(shooter.defaultDiscipline, 'Discipline')}
                        {createContentBlock(shooter.numberOfResult, 'Results')}
                        {createContentBlock(
                            convertToDisplayFormat(shooter.synchronizedAt),
                            'Last Successful Sync',
                        )}
                        <CardContent>
                            {createStatus(shooter.syncStatus)}
                            {createSubHeader(`Updated at ${convertToDisplayFormat(shooter.updatedAt)}`)}
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        };

        return (
            <Container maxWidth="lg">
                <Typography variant="h2">Shooter List</Typography>
                <Divider />
                {shooters.map(shooter => createShooterCard(shooter))}
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    isFetchingShooters: state.shooter.isFetching,
    shooters: state.shooter.shooters,
});

const mapDispatchToProps = (dispatch: any) => ({
    getAllShooters: () => dispatch(getAllShootersAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
