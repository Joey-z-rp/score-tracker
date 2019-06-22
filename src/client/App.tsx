import * as React from 'react';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';

import Homepage from './pages/homePage';
import PageNotFound from './pages/pageNotFound';
import Synchronize from './pages/synchronize';

const App = () => (
    <StylesProvider injectFirst>
        <Switch>
            <Route component={Homepage} exact path="/" />
            <Route component={Synchronize} exact path="/sync" />
            <Route component={PageNotFound} />
        </Switch>
    </StylesProvider>
);

export default withRouter(App);
