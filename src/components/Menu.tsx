import {
    motion,
    MotionValue,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    type HTMLMotionProps
} from 'motion/react';
import React, { use, useEffect, useRef } from 'react';
import { cn } from '../utils';
import Container from './Container';
import TextAnimation from './TextAnimation';
import useLanguage from '../hooks/useLanguage';
import WordDividedText from './WordDividedText';
import ParallaxText from './ParallaxText';
import gsap from 'gsap';

const Menu = ({
    className,
    scrollYProgress,
    ...props
}: HTMLMotionProps<'div'> & {
    scrollYProgress: MotionValue<number>;
}) => {
    const height = useMotionValue('70vh');
    const paddingBlock = useMotionValue('2.5vw');
    const maxWidth = useMotionValue('95vw');
    const scrollInContainer = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const scrollScaled = useTransform(scrollInContainer, [0, 30], [0, 100]);
    const otherImgsOpacity = useMotionValue(0);
    const translateX = useTransform(
        scrollInContainer,
        [25, 65],
        ['0%', '-300%']
    );

    const { language } = useLanguage();

    useEffect(() => {
        const unsuscribe = scrollScaled.on('change', (value) => {
            if (value >= 50) {
                height.set('100vh');
                maxWidth.set('100vw');
                paddingBlock.set('0vw');
                otherImgsOpacity.set(1);
            } else {
                height.set('70vh');
                maxWidth.set('95vw');
                paddingBlock.set('2.5vw');
                otherImgsOpacity.set(0);
            }
        });

        return () => unsuscribe();
    }, [scrollScaled]);

    return (
        <>
            <motion.div className="bg-white relative overflow-hidden">
                <Container>
                    <ParallaxText
                        disableProgress
                        className="menuParallaxText"
                        wrapper={
                            <motion.div className="parallaxTextItemContainer" />
                        }
                    >
                        <TextAnimation
                            key={`MENU-LOWER-${language}`}
                            disableOnce
                            customAnimation={(elements) => {
                                const tl = gsap.timeline();

                                gsap.set(elements, { y: '100%' });
                                gsap.set(
                                    '.menuParallaxText .parallaxTextItemContainer',
                                    {
                                        translateX: '150%'
                                    }
                                );

                                tl.to(
                                    elements,
                                    {
                                        y: '0%',
                                        duration: 0.75,
                                        stagger: 0.125,
                                        ease: 'power3.out'
                                    },
                                    0
                                ).to(
                                    '.menuParallaxText .parallaxTextItemContainer',
                                    {
                                        translateX: '0%',
                                        duration: 1.5,
                                        ease: 'power3.out'
                                    },
                                    0
                                );
                            }}
                        >
                            <WordDividedText
                                string="NUESTRO MENU"
                                className="spicy-font font-normal text-[15vw] leading-[0.9em] pt-[2.5vw]"
                            />
                        </TextAnimation>
                    </ParallaxText>
                </Container>
            </motion.div>
            <motion.div className={cn('overflow-hidden', className)} {...props}>
                <Container
                    style={{
                        paddingBlock,
                        maxWidth,
                        translateX
                    }}
                    className="flex justify-start menuContainer relative *:min-w-full"
                >
                    <motion.img
                        src="/menu_img.webp"
                        alt="menu_img"
                        className="object-cover h-full block"
                        style={{
                            height
                        }}
                    />
                    <motion.img
                        src="/menu_img.webp"
                        alt="hero_img"
                        className="object-cover h-full block"
                        style={{
                            height,
                            opacity: otherImgsOpacity
                        }}
                    />
                    <motion.img
                        src="/menu_img.webp"
                        alt="hero_img"
                        className="object-cover h-full block"
                        style={{
                            height,
                            opacity: otherImgsOpacity
                        }}
                    />
                    <motion.img
                        src="/menu_img.webp"
                        alt="hero_img"
                        className="object-cover h-full"
                        style={{
                            height,
                            opacity: otherImgsOpacity
                        }}
                    />
                </Container>
            </motion.div>
        </>
    );
};

export default Menu;
