import React from 'react';
import { cn } from '../utils';
import type { ClassValue } from 'clsx';

const PerspectiveText = ({
    label,
    className,
    SecondLabelClassName,
    firstLabelClassName
}: {
    label: string;
    className?: ClassValue;
    firstLabelClassName?: ClassValue;
    SecondLabelClassName?: ClassValue;
}) => {
    return (
        <span className="block perspectiveText">
            <span className={cn(firstLabelClassName)}>{label}</span>
            <span className={cn(SecondLabelClassName)}>{label}</span>
        </span>
    );
};

export default PerspectiveText;
