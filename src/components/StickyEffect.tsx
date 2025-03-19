import {
    motion,
    useScroll,
    useTransform,
    type HTMLMotionProps
} from 'motion/react';
import React, { useRef } from 'react';
import About from './About';
import Menu from './Menu';

const StickyEffect = ({
    ...props
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLMotionProps<'div'>>,
    HTMLMotionProps<'div'>
>) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <motion.div
            className="h-[150svh] relative flex flex-col bg-neutral-200"
            ref={container}
        >
            <About
                className="sticky top-0"
                style={{
                    scale,
                    rotate
                }}
            />
            <Menu className="relative bg-white flex-1" />
        </motion.div>
    );
};

export default StickyEffect;
