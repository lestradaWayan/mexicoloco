import { motion, type HTMLMotionProps } from 'motion/react';
import React from 'react';
import { cn } from '../utils';

const Menu = ({ className, ...props }: HTMLMotionProps<'div'>) => {
    return (
        <motion.div className={cn('', className)} {...props}>
            Menu
        </motion.div>
    );
};

export default Menu;
