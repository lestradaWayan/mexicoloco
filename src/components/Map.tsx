import React from 'react';
import TextAnimation from './TextAnimation';
import WordDividedText from './WordDividedText';

const Map = () => {
    return (
        <div className="h-[200vh]">
            <TextAnimation
                classSelector="textAnimation"
                animationOptions={{
                    stagger: 0.125
                }}
                className="spicy-font text-black text-[clamp(2rem,6vw,7.5rem)] mx-auto max-w-fit mb-6 flex-wrap justify-center"
            >
                <WordDividedText
                    string="ESTO ES EL MAPAP"
                    className="leading-none uppercase"
                    wrapper={
                        <p className="wordInDividedTextWrapper textAnimation"></p>
                    }
                />
            </TextAnimation>
        </div>
    );
};

export default Map;
