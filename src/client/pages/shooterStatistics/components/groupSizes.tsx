import * as React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as d3 from 'd3';

const GroupSizesChart = styled.div`
    svg {
        border: 1px solid;
    }
`;

class GroupSizes extends React.Component<any> {
    componentDidMount() {
        if (Object.keys(this.props.groupSizesData).length !== 0) {
            console.log({groupSizesData: this.props.groupSizesData})
            draw(this.props.groupSizesData['800y']);
        }
    }

    render() {
        const { isFetching } = this.props;

        if (isFetching) return <CircularProgress />;

        return (
            <GroupSizesChart id="groupSizes" />
        );
    }
}

export default GroupSizes;

function draw(groupSizesData) {
    const margin = 50;
    const width = 1000;
    const height = 500;
    const dataGroup = d3.select('#groupSizes').append('svg')
        .attr('width', width + margin)
        .attr('height', height + 2 * margin)
        .append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
    const getX = d3.scaleLinear().domain(d3.extent(groupSizesData, groupSize => groupSize.index))
        .range([0, width]);
    const getY = d3.scaleLinear().domain(d3.extent(groupSizesData, groupSize => groupSize.groupSizeInMM))
        .range([height, 0]);
    const line = d3.line().x(data => getX(data.index)).y(data => getY(data.groupSizeInMM));

    dataGroup.append('path').data([groupSizesData]).attr('fill', 'none').attr('stroke', 'red').attr('d', line);

    const xAxisGroup = dataGroup.append('g')
        .attr('transform', `translate(0, ${height})`);
    const xAxis = d3.axisBottom(getX);

    xAxis(xAxisGroup);

    const yAxisGroup = dataGroup.append('g');
    const yAxis = d3.axisLeft(getY);

    yAxis(yAxisGroup);
}