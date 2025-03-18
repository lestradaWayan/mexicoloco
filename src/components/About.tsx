import { motion } from 'motion/react';
import Container from './Container';
import WordDividedText from './WordDividedText';
import TextAnimation from './TextAnimation';

const About = () => {
    return (
        <motion.div>
            <Container>
                <TextAnimation
                    animationOptions={{
                        stagger: 0.125
                    }}
                    disableRepetition
                    classSelector="lol"
                >
                    <WordDividedText
                        string={
                            'México Loco es una experiencia autentica de comida y ambiente mexicanos, siéntete bienvenido con nuestro restaurante y relájate con la música del mariachi, acompañado con uno de nuestros platillos tradicionales o bebidas.'
                        }
                        selector="lol"
                    />
                </TextAnimation>
            </Container>
        </motion.div>
    );
};

export default About;
