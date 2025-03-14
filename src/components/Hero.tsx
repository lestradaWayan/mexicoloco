import WordDividedText from './WordDividedText';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import Container from './Container';
import TextAnimation from './TextAnimation';
import ParallaxText from './ParallaxText';

const Hero = () => {
    const container = useRef(null);

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
        gsap.to('.heroImgContainer', {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power3.out',
            delay: 1.25
        });
    }, []);

    return (
        <motion.div ref={container} className="pt-[max(10rem,15svh)] h-[200vh]">
            <motion.div
                style={{
                    scale
                }}
            >
                <Container>
                    <ParallaxText
                        className="gap-4"
                        progress={useTransform(
                            scrollYProgress,
                            [0, 0.5],
                            ['0%', '100%']
                        )}
                    >
                        <TextAnimation
                            classSelector="textAnimation"
                            animationOptions={{
                                stagger: 0.125,
                                delay: 1,
                                repetitionDelay: 0.25
                            }}
                            className="spicy-font text-rose-500 text-[clamp(2rem,6vw,7.5rem)] mx-auto max-w-fit mb-6 flex-wrap justify-center"
                            disableRepetition
                            disableViewDetection
                        >
                            <WordDividedText
                                string="Picardia pura para comer y beber"
                                className="leading-none uppercase"
                                wrapper={
                                    <p className="wordInDividedTextWrapper textAnimation"></p>
                                }
                            />
                        </TextAnimation>
                    </ParallaxText>
                </Container>
            </motion.div>
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
