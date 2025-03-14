import type { ClassValue } from 'clsx';
import React, { Fragment, type ReactNode } from 'react';
import { cn } from '../utils';

const WordDividedText = ({
    string,
    className,
    wrapper
}: {
    string: string;
    className?: ClassValue;
    wrapper?: ReactNode;
}) => {
    return string.split(' ').map((word, index) => {
        const content = (
            <span
                className={cn('wordInDividedText', className)}
                key={`${word}-in-divided-text-${index}`}
            >
                {word}
            </span>
        );

        // Si hay un wrapper, lo usamos para envolver el span
        if (wrapper) {
            return (
                <Fragment key={`${word}-in-divided-text-${index}`}>
                    {React.cloneElement(
                        wrapper as React.ReactElement,
                        {},
                        content
                    )}
                </Fragment>
            );
        }

        // Si no hay un wrapper, retornamos solo el span
        return content;
    });
};

export default WordDividedText;
