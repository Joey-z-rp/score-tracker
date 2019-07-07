import * as React from 'react';
import { useEffect, useState } from 'react';

export const withMousePosition = (WrappedComponent: any) => props => {
    const [mouseX, setMouseX] = useState(-1000);
    const [mouseY, setMouseY] = useState(-1000);

    useEffect(() => {
        console.log('mount')
        const listener = event => {
            setMouseX(event.clientX);
            setMouseY(event.clientY);
        };
        document.addEventListener('mousemove', listener);

        return () => {
            document.removeEventListener('mousemove', listener);
        };
    }, []);

    return <WrappedComponent mouseX={mouseX} mouseY={mouseY} {...props} />
};
