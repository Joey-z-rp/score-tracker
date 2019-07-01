import * as React from 'react';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';

import ShooterListPage from './shooterList/ShooterListPage';
import PageNotFound from './pageNotFound/PageNotFound';
import ShooterStatistics from './shooterStatistics/ShooterStatisticsPage';
import Synchronize from './synchronize/SynchronizePage';

const App = () => (
    <StylesProvider injectFirst>
        <Switch>
            <Route component={ShooterListPage} exact path="/" />
            <Route component={Synchronize} exact path="/sync" />
            <Route component={ShooterStatistics} exact path="/shooter/:shooterId" />
            <Route component={PageNotFound} />
        </Switch>
    </StylesProvider>
);

export default withRouter(App);
