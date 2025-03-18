import React from 'react';
import TextAnimation from './TextAnimation';
import WordDividedText from './WordDividedText';

const Map = () => {
    return (
        <div className="h-[200vh]">
            <TextAnimation
                animationOptions={{
                    stagger: 0.125
                }}
                className="spicy-font text-black text-[clamp(2rem,6vw,7.5rem)] mx-auto max-w-fit flex-wrap justify-center"
            >
                <WordDividedText
                    string="ESTO ES EL MAPA"
                    className="leading-none uppercase"
                />
            </TextAnimation>
        </div>
    );
};

export default Map;
