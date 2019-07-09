import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

import { withMousePosition } from '../HOCs/withMousePosition';

const DEFAULT_OFFSET_X = 5;
const DEFAULT_OFFSET_Y = 5;

const Tooltip = styled.div.attrs(({ mouseX, mouseY, offsetX, offsetY, translateY }) => ({
    style: {
        left: `${mouseX + offsetX}px`,
        top: `${mouseY + offsetY + translateY}px`,
    },
}))`
    position: fixed;
`;

const StickyTooltip = ({ children, mouseX, mouseY, offsetX, offsetY }) => {
    const tooltipElement: any = useRef(null);
    const [height, setHeight] = useState(null);
    useEffect(() => {
        if (!height) {
            const offsetHeight = tooltipElement && tooltipElement.current!
                && tooltipElement.current!.offsetHeight;
            if (offsetHeight) return setHeight(offsetHeight);
        }
    });

    const windowHalfHeight = window.innerHeight / 2;
    const translateY = mouseY > windowHalfHeight ? -Number(height) : 0;

    return (
        <Tooltip
            mouseX={mouseX}
            mouseY={mouseY}
            offsetX={offsetX || DEFAULT_OFFSET_X}
            offsetY={offsetY || DEFAULT_OFFSET_Y}
            ref={tooltipElement}
            translateY={translateY}
        >
            {children}
        </Tooltip>
    );
};

export default withMousePosition(StickyTooltip);
