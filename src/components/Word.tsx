import { MotionValue, useTransform, type HTMLMotionProps } from 'motion/react';
import React, { type ReactNode } from 'react';

const Word = ({
    children,
    minmax,
    progress,
    range,
    ...props
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLMotionProps<'p'>>,
    HTMLMotionProps<'p'>
> & {
    progress: MotionValue<number>;
    range: [number, number];
    minmax: [number, number];
}) => {
    const opacity = useTransform(progress, range, minmax);

    return React.cloneElement(children as React.ReactElement<typeof children>, {
        style: {
            opacity
        },
        ...props
    });
};

export default Word;
