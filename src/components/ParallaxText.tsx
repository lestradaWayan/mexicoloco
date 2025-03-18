import React, { useEffect, type ReactNode } from 'react';
import { cn } from '../utils';
import type { MotionValue } from 'motion';
import { motion, type HTMLMotionProps } from 'motion/react';

const ParallaxText = ({
    children,
    className,
    numberOfCopies,
    progress,
    childProps,
    wrapper,
    ...props
}: HTMLMotionProps<'div'> & {
    numberOfCopies?: number;
    progress: MotionValue<number> | MotionValue<string>;
    childProps?: HTMLMotionProps<'div'>;
    wrapper?: ReactNode;
}) => {
    const child = React.Children.only(children) as React.ReactElement<
        HTMLMotionProps<'div'>
    >;
    const originalClassName = child.props.className || '';

    return (
        <motion.div
            className={cn(
                'parallaxText flex items-center justify-center overflow-hidden',
                className
            )}
            {...props}
        >
            {Array.from({ length: numberOfCopies || 3 }).map((_, index) =>
                React.cloneElement(
                    wrapper as React.ReactElement,
                    { key: `parallaxText-item-${index}` },
                    React.cloneElement(
                        children as React.ReactElement<HTMLMotionProps<'div'>>,
                        {
                            className: cn(
                                'parallaxTextItem',
                                originalClassName,
                                {
                                    'text-yellow-500': index === 0,
                                    'text-rose-500': index === 1,
                                    'text-blue-500': index === 2
                                }
                            ),
                            style: {
                                translateX: progress,
                                ...childProps?.style
                            }
                        }
                    )
                )
            )}
        </motion.div>
    );
};

export default ParallaxText;
