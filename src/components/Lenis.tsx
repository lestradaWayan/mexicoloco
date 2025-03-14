import gsap from 'gsap';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

const Lenis = ({
    children
}: {
    children: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >['children'];
}) => {
    // const lenis = useLenis(({ scroll }) => {
    //     // called every scroll
    // });

    return <ReactLenis root>{children}</ReactLenis>;
};

export default Lenis;
