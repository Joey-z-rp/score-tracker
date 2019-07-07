import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { convertToDisplayFormat } from '../../../common/utils/date';

const HEyes = ({hEyes}) => {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Stage</TableCell>
                        <TableCell align="right">Result Number</TableCell>
                        <TableCell align="right">X(mm)</TableCell>
                        <TableCell align="right">Y(mm)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hEyes.map(hEye => (
                        <TableRow hover key={`${hEye.shootingResultId}:${hEye.resultNumber}`}>
                            <TableCell component="th" scope="row">
                                {convertToDisplayFormat(hEye.date)}
                            </TableCell>
                            <TableCell align="right">{hEye.distance}</TableCell>
                            <TableCell align="right">{hEye.stage}</TableCell>
                            <TableCell align="right">{hEye.resultNumber}</TableCell>
                            <TableCell align="right">{hEye.resultXInMM}</TableCell>
                            <TableCell align="right">{hEye.resultYInMM}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default HEyes;
