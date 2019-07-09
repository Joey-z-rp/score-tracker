import * as d3 from 'd3';
import * as React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

import {
    BULL_RING_RADIUS,
    BULLET_DIAMETER,
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

export default Target;

function draw(x, y, distance) {
    const offset = 10;
    const width = 200;
    const height = width;
    const [translateX, translateY] = calculateTranslate({ width, height, offset, x, y });
    
    d3.selectAll('#hEyeTargetSvg').remove();
    
    const ringsToInclude = [SUPER_V_RADIUS, CENTER_RING_RADIUS, BULL_RING_RADIUS];

    const targetRings = ringsToInclude.map(ring => ({
        inner: ring[distance].inner,
        outer: ring[distance].outer,
    }));

    const outmostRing = targetRings[targetRings.length - 1];

    const scale = d3.scaleLinear()
        .domain([0, outmostRing.outer]).range([0, width - 3 * offset]);

    const dataGroup = d3.select('#hEyeTarget').append('svg')
        .attr('id', 'hEyeTargetSvg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${translateX}, ${translateY})`);

    dataGroup.append('line').attr('x1', -width).attr('y1', 0).attr('x2', width).attr('y2', 0)
        .attr('stroke', 'grey');
    dataGroup.append('line').attr('x1', 0).attr('y1', -height).attr('x2', 0).attr('y2', height)
        .attr('stroke', 'grey');

    targetRings.forEach(ring => {
        const arc = d3.arc().innerRadius(scale(ring.inner)).outerRadius(scale(ring.outer))
            .startAngle(0).endAngle(2 * Math.PI);
        dataGroup.append('path').attr('d', arc);
    });

    dataGroup.append('circle').attr('cx', scale(x)).attr('cy', scale(-y))
        .attr('r', scale(BULLET_DIAMETER / 2)).style('fill', 'red');
}

function calculateTranslate({ width, height, offset, x, y }): number[] {
    switch (true) {
        case (x > 0) && ( y < 0):
            return [offset, offset];

        case (x > 0) && ( y >= 0):
            return [offset, height - offset];

        case (x <= 0) && (y < 0):
            return [width - offset, offset];

        case (x <= 0) && (y >= 0):
            return [width - offset, height - offset];

        default:
            return [offset, offset];
    }
}