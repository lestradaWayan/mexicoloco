import React from 'react';
import { cn } from '../utils';

const Container = ({
    className,
    children,
    ...props
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>) => {
    return <div className={cn('w-[95vw] mx-auto', className)}>{children}</div>;
};

export default Container;
