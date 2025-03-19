import React, { useEffect, type ReactNode } from 'react';
import { cn } from '../utils';
import type { MotionValue } from 'motion';
import { motion, type HTMLMotionProps } from 'motion/react';

type ParallaxTextProps = HTMLMotionProps<'div'> & {
    numberOfCopies?: number;
    childProps?: HTMLMotionProps<'div'>;
    wrapper?: ReactNode;
} & (
        | {
              disableProgress?: false;
              progress: MotionValue<number> | MotionValue<string>;
          }
        | {
              disableProgress: true;
              progress?: never;
          }
    );

const ParallaxText = ({
    children,
    className,
    numberOfCopies,
    disableProgress = false,
    childProps,
    progress,
    wrapper,
    ...props
}: ParallaxTextProps) => {
    const child = React.Children.only(children) as React.ReactElement<
        HTMLMotionProps<'div'>
    >;

    const originalClassName = child.props.className || '';

    return (
        <motion.div
            className={cn(
                'parallaxText flex items-center justify-center',
                className
            )}
            {...props}
        >
            {Array.from({ length: numberOfCopies || 3 }).map((_, index) => {
                if (wrapper) {
                    return React.cloneElement(
                        wrapper as React.ReactElement,
                        { key: `parallaxText-item-${index}` },
                        React.cloneElement(
                            children as React.ReactElement<
                                HTMLMotionProps<'div'>
                            >,
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
                    );
                }

                return React.cloneElement(
                    children as React.ReactElement<HTMLMotionProps<'div'>>,
                    {
                        key: `parallaxText-item-${index}`,
                        className: cn('parallaxTextItem', originalClassName, {
                            'text-yellow-500': index === 0,
                            'text-rose-500': index === 1,
                            'text-blue-500': index === 2
                        }),
                        style: {
                            translateX: progress,
                            ...childProps?.style
                        }
                    }
                );
            })}
        </motion.div>
    );
};

export default ParallaxText;
