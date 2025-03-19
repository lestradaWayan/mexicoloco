import {
    motion,
    useScroll,
    useTransform,
    type HTMLMotionProps
} from 'motion/react';
import React, { useRef } from 'react';
import About from './About';
import Menu from './Menu';
import useLanguage from '../hooks/useLanguage';

const StickyEffect = ({
    ...props
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLMotionProps<'div'>>,
    HTMLMotionProps<'div'>
>) => {
    const { language } = useLanguage();
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
    const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
    const translateY = useTransform(scrollYProgress, [0, 0.5], ['0vw', '5vw']);

    return (
        <motion.div
            className="relative flex flex-col bg-neutral-200"
            ref={container}
        >
            <About
                className="sticky top-0"
                style={{
                    scale,
                    rotate,
                    translateY
                }}
                key={`sticky-about-${language}`}
            />

            <motion.div className="h-[400vh]">
                <Menu
                    scrollYProgress={scrollYProgress}
                    className="bg-white sticky top-0 h-[150vh]"
                    key={`sticky-menu-${language}`}
                />
            </motion.div>
        </motion.div>
    );
};

export default StickyEffect;
