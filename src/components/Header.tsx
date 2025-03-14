import LanguageSelector from './LanguageSelector';
import Container from './Container';
import Navigation from './Navigation';
import { useEffect } from 'react';
import gsap from 'gsap';

const Header = () => {
    useEffect(() => {
        gsap.fromTo(
            '.siteLogo',
            {
                scale: 0,
                opacity: 0,
                rotate: '-45deg'
            },
            {
                scale: 1,
                rotate: '0deg',
                opacity: 1,
                duration: 0.75,
                ease: 'back.inOut(1)',
                delay: 0.25
            }
        );
    }, []);
    return (
        <header className="fixed top-0 z-[99] w-full">
            <Container className="flex items-center relative gap-8 py-4">
                <a href="/" className="mr-auto relative z-[101] siteLogo">
                    <img src="/logo.webp" alt="logo" className="size-18" />
                </a>

                <div className="bg-white rounded-full flex items-center gap-8 py-3 px-5 overflow-hidden">
                    <LanguageSelector />
                    <Navigation />
                </div>
            </Container>
        </header>
    );
};

export default Header;
