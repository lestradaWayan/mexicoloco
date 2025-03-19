import {
    motion,
    useScroll,
    useTransform,
    type HTMLMotionProps
} from 'motion/react';
import Container from './Container';
import WordDividedText from './WordDividedText';
import TextAnimation from './TextAnimation';
import { useRef } from 'react';
import { cn } from '../utils';
import Word from './Word';
import useLanguage from '../hooks/useLanguage';

const About = ({ className, ...props }: HTMLMotionProps<'div'>) => {
    const { dictionary, language } = useLanguage();

    const container = useRef<any>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.5', 'start 0.1']
    });

    return (
        <motion.div
            className={cn('bg-rose-600 py-24', className)}
            ref={container}
            {...props}
        >
            <Container className="flex items-center flex-col justify-center">
                <TextAnimation
                    key={`about-title-${language}`}
                    animationOptions={{
                        stagger: 0.075
                    }}
                    className="flex flex-wrap !gap-2.5 spicy-font text-[clamp(3rem,10vw,5rem)] mb-8  justify-center text-white font-normal"
                    classSelector="about-text"
                    disableOnce
                >
                    <WordDividedText
                        string={dictionary.about.title}
                        selector="about-text"
                    />
                </TextAnimation>

                <motion.div className='className="flex flex-wrap spicy-font text-[min(2.25rem,7.5vw)] !gap-x-[0.25em] justify-center max-w-5xl text-white font-normal"'>
                    <WordDividedText
                        string={dictionary.about.text}
                        selector="about-text"
                        customReturn={(words, wrapperClasses, itemClasses) => {
                            return words.map((word, i) => {
                                const start = i / words.length;
                                const end = start + 1 / words.length;

                                return (
                                    <Word
                                        key={`about-text-word-${i}`}
                                        range={[start, end]}
                                        minmax={[0.5, 1]}
                                        progress={scrollYProgress}
                                    >
                                        <motion.p
                                            className={cn(wrapperClasses)}
                                        >
                                            <span className={cn(itemClasses)}>
                                                {word}
                                            </span>
                                        </motion.p>
                                    </Word>
                                );
                            });
                        }}
                    />
                </motion.div>
            </Container>
        </motion.div>
    );
};

export default About;
