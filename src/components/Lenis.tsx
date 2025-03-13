import { ReactLenis, useLenis } from 'lenis/react';

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
