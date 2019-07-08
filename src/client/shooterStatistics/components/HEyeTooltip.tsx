import * as React from 'react';
import styled from 'styled-components';

import Target from './Target';

import StickyTooltip from '../../UI/StickyTooltip';


const HEyeTooltip = ({ distance, x, y }) => {

    return (
        <StickyTooltip>
            <Target distance={distance} x={x} y={y} />
        </StickyTooltip>
    );
};

export default HEyeTooltip;
