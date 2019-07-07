import * as React from 'react';
import styled from 'styled-components';

import StickyTooltip from '../../UI/StickyTooltip';


const HEyeTooltip = ({ x, y }) => {

    return (
        <StickyTooltip>
            x: {x}
            y: {y}
        </StickyTooltip>
    );
};

export default HEyeTooltip;
