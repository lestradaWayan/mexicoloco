import React, { useEffect } from 'react';
import usePathname from '../hooks/usePathname';
import { AVAILABLE_LANGUAGES } from '../constants';
import { cn } from '../utils';
import gsap from 'gsap';
import useLanguage from '../hooks/useLanguage';

const LanguageSelector = () => {
    const pathname = usePathname();
    const { language, dictionary } = useLanguage();

    useEffect(() => {
        gsap.to('.langSelector span', {
            lineHeight: 1.25,
            duration: 0.75,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.to('.langSelector a span', {
            opacity: 1,
            y: '0%',
            duration: 0.75,
            stagger: 0.125,
            ease: 'power3.out',
            delay: 1
        });
    }, []);

    return (
        <div className="langSelector flex items-center text-black text-lg divide-x divide-black divide-solid relative z-[101] big-shoulders-font">
            {Object.keys(AVAILABLE_LANGUAGES).map((lang, index) => (
                <a
                    href={`/${
                        (lang as keyof typeof AVAILABLE_LANGUAGES) === 'EN'
                            ? ''
                            : lang.toLowerCase()
                    }`}
                    key={`lang-${index}`}
                    className={cn(
                        'cursor-pointer first-of-type:pr-3 last-of-type:pl-3 select-none max-h-fit',
                        {
                            '!text-black/40 pointer-events-none':
                                lang === language ||
                                (lang === 'EN' && pathname === '/')
                        }
                    )}
                >
                    <span className="leading-0 opacity-0">{lang}</span>
                </a>
            ))}
        </div>
    );
};

export default LanguageSelector;
