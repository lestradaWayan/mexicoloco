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
        <div className="perspectiveText">
            <p className={cn(firstLabelClassName)}>{label}</p>
            <p className={cn(SecondLabelClassName)}>{label}</p>
        </div>
    );
};

export default PerspectiveText;
