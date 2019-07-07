import * as React from 'react';
import styled from 'styled-components';

import { withMousePosition } from '../HOCs/withMousePosition';

const DEFAULT_OFFSET_X = 5;
const DEFAULT_OFFSET_Y = 5;

const Tooltip = styled.div.attrs(({ mouseX, mouseY, offsetX, offsetY }) => ({
    style: {
        left: `${mouseX + offsetX}px`,
        top: `${mouseY + offsetY}px`,
    },
}))`
    position: fixed;
`;

const StickyTooltip = ({ children, mouseX, mouseY, offsetX, offsetY }) => {
    return (
        <Tooltip
            mouseX={mouseX}
            mouseY={mouseY}
            offsetX={offsetX || DEFAULT_OFFSET_X}
            offsetY={offsetY || DEFAULT_OFFSET_Y}
        >
            {children}
        </Tooltip>
    );
};

export default withMousePosition(StickyTooltip);
