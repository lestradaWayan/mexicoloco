import gsap from 'gsap';
import {
    motion,
    useInView,
    type HTMLMotionProps,
    type UseInViewOptions
} from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../utils';
import visibleDirective from 'astro/runtime/client/visible.js';

const TextAnimation = ({
    children,
    classSelector,
    animationOptions = {},
    disableInView = false,
    disableOnce = false,
    className,
    customAnimation,
    ...props
}: {
    classSelector?: string;
    animationOptions?: gsap.TweenVars & {
        visibleMargin?: UseInViewOptions['margin'];
    };
    disableInView?: boolean;
    disableOnce?: boolean;
    customAnimation?: (
        elements: NodeListOf<Element>,
        timeline?: gsap.core.Timeline
    ) => void;
} & HTMLMotionProps<'div'>) => {
    const element = useRef<HTMLDivElement>(null);
    const [isRunningAnimation, setRunningAnimation] = useState<boolean>(false);
    const onceValue = useMemo(() => !disableOnce, [disableOnce]);

    const isVisible = useInView(element, {
        once: onceValue,
        margin: animationOptions?.visibleMargin ?? '0%'
    });

    useEffect(() => {
        if (!element.current || isRunningAnimation) return;

        function runAnimation(targetElements: NodeListOf<Element>) {
            if (customAnimation) {
                customAnimation(targetElements);
                return;
            }

            gsap.fromTo(
                targetElements,
                {
                    y: '100%'
                },
                {
                    y: '0%',
                    duration: 0.75,
                    ease: 'power3.out',
                    onStart: () => {
                        setRunningAnimation(() => true);
                    },
                    onComplete: () => {
                        setRunningAnimation(() => false);
                    },
                    ...animationOptions
                }
            );
        }

        const targetElements = element.current.querySelectorAll(
            `.textAnimation ${
                classSelector
                    ? `.wrapperForTextAnimation.${classSelector}`
                    : '.wrapperForTextAnimation'
            } > span`
        );
        if (targetElements.length === 0) return;

        if (disableInView) {
            runAnimation(targetElements);
            return;
        }

        if (isVisible) {
            runAnimation(targetElements);
        }
    }, [isVisible]);

    return (
        <motion.div
            className={cn('textAnimation', className)}
            ref={element}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default TextAnimation;
