import * as React from 'react';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';

import Homepage from './pages/homePage';
import PageNotFound from './pages/pageNotFound';

const App = () => (
    <Switch>
        <Route component={Homepage} exact path="/" />
        <Route component={PageNotFound} />
    </Switch>
);

export default withRouter(App);
