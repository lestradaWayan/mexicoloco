import WordDividedText from './WordDividedText';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import Container from './Container';
import TextAnimation from './TextAnimation';
import ParallaxText from './ParallaxText';
import useLanguage from '../hooks/useLanguage';

const Hero = () => {
    const container = useRef(null);

    const { dictionary, language } = useLanguage();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.75]);
    const imgWidth = useTransform(
        scrollYProgress,
        [0, 0.375],
        ['95vw', '100vw']
    );
    const imgRadius = useTransform(
        scrollYProgress,
        [0, 0.15],
        ['0.5rem', '0rem']
    );
    const imgScale = useTransform(scrollYProgress, [0.65, 1], [1, 1.2]);
    const imgHeight = useTransform(
        scrollYProgress,
        [0.35, 0.7],
        ['80vh', '100vh']
    );

    useEffect(() => {
        // gsap.to('.heroImgContainer', {
        //     clipPath: 'inset(0% 0% 0% 0%)',
        //     duration: 1,
        //     ease: 'power3.out',
        //     delay: 1.25
        // });
    }, []);

    return (
        <motion.div
            ref={container}
            className="pt-[max(12.5rem,25svh)] h-[200vh]"
        >
            <div className="overflow-hidden">
                <Container>
                    {/* PARALLAX TEXT UPPER */}
                    <ParallaxText
                        className="gap-4 heroParallaxText"
                        progress={useTransform(
                            scrollYProgress,
                            [0, 0.5],
                            ['0%', '100%']
                        )}
                        wrapper={
                            <motion.div className="parallaxTextItemContainer" />
                        }
                    >
                        <TextAnimation
                            key={`hero-title-${language}`}
                            customAnimation={(elements) => {
                                const tl = gsap.timeline();

                                // Animar simultáneamente los elementos verticales y horizontales
                                tl.to(
                                    elements,
                                    {
                                        y: '0%',
                                        duration: 0.75,
                                        stagger: 0.125,
                                        ease: 'power3.out'
                                    },
                                    1
                                ).to(
                                    '.heroParallaxText .parallaxTextItemContainer',
                                    {
                                        translateX: '0%',
                                        duration: 2.25,
                                        ease: 'power3.out'
                                    },
                                    1
                                );
                            }}
                            className="spicy-font text-rose-500 text-[clamp(2.75rem,10vw,10rem)] justify-center"
                            disableInView
                        >
                            <WordDividedText
                                string={dictionary.hero.title
                                    .split(' ')
                                    .slice(0, 2)
                                    .join(' ')}
                                className="leading-none uppercase"
                            />
                        </TextAnimation>
                    </ParallaxText>
                    {/* PARALLAX TEXT LOWER */}
                    <ParallaxText
                        className="gap-4 heroParallaxText"
                        progress={useTransform(
                            scrollYProgress,
                            [0, 0.5],
                            ['0%', '-100%']
                        )}
                        wrapper={
                            <motion.div className="parallaxTextItemContainerAlt" />
                        }
                    >
                        <TextAnimation
                            key={`hero-title-${language}`}
                            customAnimation={(elements) => {
                                const tl = gsap.timeline();

                                // Animar simultáneamente los elementos verticales y horizontales
                                tl.to(
                                    elements,
                                    {
                                        y: '0%',
                                        duration: 0.75,
                                        stagger: 0.125,
                                        ease: 'power3.out'
                                    },
                                    1
                                ).to(
                                    '.heroParallaxText .parallaxTextItemContainerAlt',
                                    {
                                        translateX: '0%',
                                        duration: 2.25,
                                        ease: 'power3.out'
                                    },
                                    1
                                );
                            }}
                            className="spicy-font text-rose-500 text-[clamp(2.75rem,10vw,10rem)] mb-2 justify-center"
                            disableInView
                        >
                            <WordDividedText
                                string={dictionary.hero.title
                                    .split(' ')
                                    .slice(2)
                                    .join(' ')}
                                className="leading-none uppercase"
                            />
                        </TextAnimation>
                    </ParallaxText>
                </Container>
            </div>
            <div className="sticky top-0 heroImgContainer overflow-hidden">
                <motion.img
                    src="/hero_img.webp"
                    loading="lazy"
                    className="object-cover heroImg w-full"
                    style={{
                        width: imgWidth,
                        margin: '0 auto',
                        // borderRadius: imgRadius,
                        overflow: 'hidden',
                        scale: imgScale,
                        height: imgHeight
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Hero;
