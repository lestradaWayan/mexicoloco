import type { ClassValue } from 'clsx';
import React, { Fragment, type JSX, type ReactNode } from 'react';
import { cn } from '../utils';

const WordDividedText = ({
    string,
    className,
    wrapper,
    selector,
    customReturn
}: {
    string: string;
    className?: ClassValue;
    wrapper?: ReactNode;
    selector?: string;
    customReturn?: (
        words: string[],
        wrapperClasses: ClassValue,
        itemClasses: ClassValue
    ) => ReactNode;
}) => {
    if (customReturn) {
        return customReturn(
            string.split(' '),
            cn(
                `wrapperForTextAnimation wordInDividedTextWrapper ${
                    selector ?? ''
                }`
            ),
            cn('wordInDividedText', className)
        );
    }

    return string.split(' ').map((word, index) => {
        const content = (
            <span className={cn('wordInDividedText', className)}>{word}</span>
        );

        // Si hay un wrapper, lo usamos para envolver el span
        if (wrapper) {
            return (
                <Fragment key={`${word}-in-divided-text-${index}`}>
                    {React.cloneElement(
                        wrapper as React.ReactElement<any>,
                        {
                            className: `wrapperForTextAnimation wordInDividedTextWrapper ${
                                selector ?? ''
                            }`
                        },
                        content
                    )}
                </Fragment>
            );
        }

        // Si no hay un wrapper, retornamos solo el span
        return (
            <p
                className={`wrapperForTextAnimation wordInDividedTextWrapper ${
                    selector ?? ''
                }`}
                key={`${word}-in-divided-text-${index}`}
            >
                {content}
            </p>
        );
    });
};

export default WordDividedText;
