import LanguageSelector from './LanguageSelector';
import Container from './Container';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header>
            <Container className="flex items-center relative gap-8 py-4">
                <a href="/" className="mr-auto relative z-[101]">
                    <img src="/logo.webp" alt="logo" className="size-18" />
                </a>

                <div className="bg-white rounded-full flex items-center gap-8 py-2 px-4 overflow-hidden">
                    <LanguageSelector />
                    <Navigation />
                </div>
            </Container>
        </header>
    );
};

export default Header;
