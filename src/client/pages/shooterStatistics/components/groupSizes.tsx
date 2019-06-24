import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as d3 from 'd3';
import { IConvertedGroupSize } from '../../../interfaces/store';

class GroupSizes extends React.Component<any> {
    componentDidMount() {
        draw(this.props.groupSizesData);
    }

    render() {
        const { isFetching } = this.props;

        if (isFetching) return <CircularProgress />;

        return (
            <div id="groupSizes" />
        );
    }
}

export default GroupSizes;

function draw(groupSizesData) {
    console.log(groupSizesData)
    const dataGroup = d3.select('#groupSizes').append('svg')
        .attr('width', 1000)
        .attr('height', 500)
        .append('g');
    const getX = d3.scaleLinear().domain(d3.extent(groupSizesData, groupSize => groupSize.index))
        .range([0, 1000]);
    const getY = d3.scaleLinear().domain(d3.extent(groupSizesData, groupSize => groupSize.groupSizeInMM))
        .range([500, 0]);
    const line = d3.line().x(data => getX(data.index)).y(data => getY(data.groupSizeInMM));

    dataGroup.append('path').data([groupSizesData]).attr('fill', 'none').attr('stroke', 'red').attr('d', line);
}