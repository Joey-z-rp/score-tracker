import * as d3 from 'd3';
import * as React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

import {
    BULL_RING_RADIUS,
    CENTER_RING_RADIUS,
    SUPER_V_RADIUS,
} from '../../../common/constants/target';

const SVGContainer = styled.div`
    svg {
        border: 1px solid;
        background-color: white;
    }
`;

const Target = ({ distance, x, y }) => {
    useEffect(() => {
        draw(x, y, distance);
    });

    return (
        <React.Fragment>
            <SVGContainer id="hEyeTarget" />
        </React.Fragment>
    );
};

function draw(x, y, distance) {
    const margin = 5;
    const width = 200;
    const height = width;
    const rangeMargin = 30;
    const calculatedWidth = width + 2 * margin;
    const calculatedHeight = height + 2 * margin;
    const centerX = calculatedWidth / 2;
    const centerY = calculatedHeight / 2;
    d3.selectAll('#hEyeTargetSvg').remove();
    
    const ringsToInclude = [SUPER_V_RADIUS, CENTER_RING_RADIUS, BULL_RING_RADIUS];

    const targetRings = ringsToInclude.map(ring => ({
        inner: ring[distance].inner,
        outer: ring[distance].outer,
    }));

    const outmostRing = targetRings[targetRings.length - 1];

    const scale = d3.scaleLinear()
        .domain([0, outmostRing.outer]).range([0, (width - rangeMargin) / 2]);

    const dataGroup = d3.select('#hEyeTarget').append('svg')
        .attr('id', 'hEyeTargetSvg')
        .attr('width', calculatedWidth)
        .attr('height', calculatedHeight)
        .append('g')
        .attr('transform', `translate(${centerX}, ${centerY})`);

    dataGroup.append('line').attr('x1', -width / 2).attr('y1', 0).attr('x2', width / 2).attr('y2', 0)
        .attr('stroke', 'grey');
    dataGroup.append('line').attr('x1', 0).attr('y1', -height / 2).attr('x2', 0).attr('y2', height / 2)
        .attr('stroke', 'grey');

    targetRings.forEach(ring => {
        const arc = d3.arc().innerRadius(scale(ring.inner)).outerRadius(scale(ring.outer))
            .startAngle(0).endAngle(2 * Math.PI);
        dataGroup.append('path').attr('d', arc);
    });

    dataGroup.append('circle').attr('cx', scale(x)).attr('cy', scale(-y))
        .attr('r', scale(8)).style('fill', 'red');
}

export default Target;