import React from 'react';
import { cn } from '../utils';
import { motion, type HTMLMotionProps } from 'motion/react';

const Container = ({
    className,
    children,
    ...props
}: HTMLMotionProps<'div'>) => {
    return (
        <motion.div
            className={cn('w-full max-w-[95vw] mx-auto', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Container;
