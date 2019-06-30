import * as d3 from 'd3';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';

const GroupSizesChart = styled.div`
    svg {
        border: 1px solid;
    }
`;

class GroupSizes extends React.Component<any> {
    state = {
        distance: '',
        distanceOptions: [],
    };

    componentDidMount() {
        if (Object.keys(this.props.groupSizesData).length !== 0
            && this.state.distanceOptions.length === 0) {
            const distanceOptions = Object.keys(this.props.groupSizesData).sort((a, b) => {
                const regex = /^(\d+)\D?$/;
                const distanceA = (a.match(regex) || [])[1];
                const distanceB = (b.match(regex) || [])[1];
                return Number(distanceA) - Number(distanceB);
            });
            this.setState({ distanceOptions, distance: distanceOptions[0] });
        }
    }

    componentDidUpdate() {
        draw(this.props.groupSizesData[this.state.distance]);
    }

    handleSelect = event => {
        this.setState({distance: event.target.value});
    };

    render() {
        const { isFetching } = this.props;
        const { distanceOptions } = this.state;

        if (isFetching) return <CircularProgress />;

        return (
            <React.Fragment>
                <Select
                    value={this.state.distance}
                    onChange={this.handleSelect}
                >
                    {distanceOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </Select>
                <GroupSizesChart id="groupSizes" />
            </React.Fragment>
        );
    }
}

export default GroupSizes;

function draw(groupSizesData) {
    console.log({groupSizesData})
    const margin = 50;
    const width = 1000;
    const height = 500;
    d3.selectAll('#groupSizesSvg').remove();
    const dataGroup = d3.select('#groupSizes').append('svg')
        .attr('id', 'groupSizesSvg')
        .attr('width', width + 2* margin)
        .attr('height', height + 2 * margin)
        .append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
    const getX = d3.scaleLinear().domain(d3.extent(groupSizesData, groupSize => groupSize.index))
        .range([0, width]);
    const groupSizeInMMArray = groupSizesData.map(data => data.groupSizeInMM);
    const maxGroupSize = Math.max(...groupSizeInMMArray);
    const getY = d3.scalePow().domain([0, maxGroupSize + 100])
        .range([height, 0]).exponent(1);
    const line = d3.line().x(data => getX(data.index)).y(data => getY(data.groupSizeInMM)).curve(d3.curveMonotoneX);

    dataGroup.append('path').data([groupSizesData]).attr('fill', 'none').attr('stroke', 'red').attr('d', line);
    
    groupSizesData.forEach(groupSize => {
        dataGroup.append('circle').attr('fill', 'red').attr('r', 4)
            .attr('cx', getX(groupSize.index))
            .attr('cy', getY(groupSize.groupSizeInMM));
    });

    const xAxisGroup = dataGroup.append('g')
        .attr('transform', `translate(0, ${height})`);
    
    const MAX_X_AXIS_TICKS = 10;
    const numberOfData = groupSizesData.length;
    let tickNumber = numberOfData > MAX_X_AXIS_TICKS ? MAX_X_AXIS_TICKS : numberOfData;
    if (tickNumber < 4) tickNumber = 1;
    const xAxis = d3.axisBottom(getX).ticks(tickNumber)
        .tickFormat(index => d3.timeFormat("%Y-%m-%d")(groupSizesData[index - 1].date));

    xAxis(xAxisGroup);

    const yAxisGroup = dataGroup.append('g');
    const yAxis = d3.axisLeft(getY);

    yAxis(yAxisGroup);
}