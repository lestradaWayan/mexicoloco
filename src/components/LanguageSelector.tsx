import React, { useEffect } from 'react';
import usePathname from '../hooks/usePathname';
import { AVAILABLE_LENGUAGES } from '../constants';
import { cn } from '../utils';
import gsap from 'gsap';

const LanguageSelector = () => {
    const pathname = usePathname();

    useEffect(() => {
        gsap.to('.langSelector span', {
            lineHeight: 1.25,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.to('.langSelector a span', {
            opacity: 1,
            y: '0%',
            duration: 1,
            stagger: 0.125,
            ease: 'power3.out',
            delay: 1
        });
    }, []);

    return (
        <div className="langSelector flex items-center text-black text-lg divide-x divide-black divide-solid relative z-[101]">
            {Object.keys(AVAILABLE_LENGUAGES).map((lang, index) => (
                <a
                    href={`/${
                        (lang as keyof typeof AVAILABLE_LENGUAGES) === 'EN'
                            ? ''
                            : lang.toLowerCase()
                    }`}
                    key={`lang-${index}`}
                    className={cn(
                        ' first-of-type:pr-3 last-of-type:pl-3 select-none max-h-fit',
                        {
                            '!text-black/40 pointer-events-none':
                                lang.toLowerCase() ===
                                    pathname.replace('/', '') ||
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
