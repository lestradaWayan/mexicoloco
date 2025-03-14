import React, { useEffect } from 'react';
import { cn } from '../utils';
import type { MotionValue } from 'motion';
import { motion, type HTMLMotionProps } from 'motion/react';

const ParallaxText = ({
    children,
    className,
    numberOfCopies,
    progress,
    ...props
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    numberOfCopies?: number;
    progress: MotionValue<number> | MotionValue<string>;
}) => {
    const child = React.Children.only(
        children
    ) as React.ReactElement<HTMLDivElement>;
    const originalClassName = child.props.className || '';

    useEffect(() => {
        const unsuscribe = progress.on('change', (value) => {
            console.log(value);
        });

        return () => {
            unsuscribe();
        };
    }, [progress]);

    return (
        <motion.div
            className={cn(
                'parallaxText flex items-center justify-center overflow-hidden',
                className
            )}
        >
            {Array.from({ length: numberOfCopies || 3 }).map((_, index) =>
                React.cloneElement(
                    children as React.ReactElement<HTMLMotionProps<'div'>>,
                    {
                        className: cn(
                            'parallaxTextItem min-w-full',
                            originalClassName,
                            {
                                'text-yellow-500': index === 0,
                                'text-rose-500': index === 1,
                                'text-blue-500': index === 2
                            }
                        ),
                        style: {
                            translateX: progress
                        }
                    }
                )
            )}
        </motion.div>
    );
};

export default ParallaxText;
