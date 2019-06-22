import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { memo } from 'react';

const PageNotFound: React.FunctionComponent = () => (
    <div>
        <Paper>
            <h1>Page not found</h1>
            <p>Please check the address and try again.</p>
        </Paper>
    </div>
);

export default memo(PageNotFound);
