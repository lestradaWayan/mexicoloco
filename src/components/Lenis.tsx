import gsap from 'gsap';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';

const Lenis = ({
    children
}: {
    children: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >['children'];
}) => {
    const { language } = useLanguage();

    // const lenis = useLenis(({ scroll }) => {
    //     // called every scroll
    // });

    if (!language) {
        return null;
    }

    return <ReactLenis root>{children}</ReactLenis>;
};

export default Lenis;
