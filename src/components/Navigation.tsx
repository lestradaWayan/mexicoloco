import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '../utils';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import PerspectiveText from './PerspectiveText';
import { MENU_LINKS } from '../constants';

const Navigation = () => {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        gsap.set('.menu-button .ham-line', {
            opacity: 0,
            width: 0,
            translateX: '-50%'
        });

        gsap.to('.menu-button .ham-line', {
            duration: 1,
            delay: 0.25,
            ease: 'back.inOut(1)',
            opacity: 1,
            width: '100%',
            stagger: 0.125
        });
    }, []);

    useEffect(() => {
        if (open) {
            gsap.set('.navigation > a > p > span', { y: '100%' });

            gsap.to('.menu-button', {
                duration: 0.75,
                ease: 'back.inOut(1)',
                rotate: '180deg',
                onStart: () => {
                    gsap.to('.menu-button .ham-line-top', {
                        duration: 0.75,
                        ease: 'back.inOut(1)',
                        rotate: '45deg',
                        top: '50%'
                    });

                    gsap.to('.menu-button .ham-line-center', {
                        duration: 0.25,
                        delay: 0.25,
                        ease: 'back.inOut(1)',
                        opacity: 0
                    });

                    gsap.to('.menu-button .ham-line-bottom', {
                        duration: 0.75,
                        ease: 'back.inOut(1)',
                        rotate: '-45deg',
                        bottom: '50%'
                    });
                }
            });

            gsap.to('.navigation > a > p > span', {
                y: '0%',
                duration: 0.75,
                stagger: 0.125,
                ease: 'power3.out',
                delay: 0.25
            });
        } else {
            gsap.to('.menu-button', {
                duration: 0.75,
                ease: 'back.inOut(1)',
                rotate: '0deg',
                onStart: () => {
                    gsap.to('.menu-button .ham-line', {
                        duration: 0.75,
                        ease: 'back.inOut(1)',
                        rotate: '0deg'
                    });

                    gsap.to('.menu-button .ham-line-center', {
                        duration: 0.25,
                        delay: 0.25,
                        ease: 'back.inOut(1)',
                        opacity: '1'
                    });

                    gsap.to('.menu-button .ham-line-top', {
                        duration: 0.75,
                        ease: 'back.inOut(1)',
                        top: '0%'
                    });

                    gsap.to('.menu-button .ham-line-bottom', {
                        duration: 0.75,
                        ease: 'back.inOut(1)',
                        bottom: '0%'
                    });
                }
            });
        }
    }, [open]);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setOpen((prev) => !prev);
                }}
                className="menu-button cursor-pointer relative h-4 w-6 flex z-[101]"
            >
                <hr className="ham-line ham-line-top h-[1px] border-none bg-black absolute top-0 left-1/2 -translate-y-1/2 [will-change:rotate] origin-center" />
                <hr
                    className={cn(
                        'ham-line ham-line-center h-[1px] bg-black border-none absolute top-1/2 left-1/2 -translate-y-1/2 [will-change:opacity] origin-center'
                    )}
                />
                <hr className="ham-line ham-line-bottom h-[1px] border-none bg-black absolute bottom-0 left-1/2 translate-y-1/2 [will-change:rotate] origin-center" />
            </button>

            <motion.div
                className={cn(
                    'navigationContainer fixed top-0 left-0 z-[99] w-screen [transition:all_0.75s_cubic-bezier(0.076,0,0.24,1)] overflow-hidden',
                    {
                        navigationOpen: open
                    }
                )}
                style={{
                    height: open ? '100svh' : '0svh'
                }}
            >
                <nav className="navigation relative top-0 left-0 h-[100svh] w-screen text-black text-[8vw] leading-none font-normal flex items-start justify-between flex-col py-[max(15svh,6rem)] spicy-font">
                    {MENU_LINKS.map(({ label, path }, index) => (
                        <a
                            href={path}
                            className="flex flex-row flex-1 items-center justify-between w-full cursor-pointer px-14 relative select-none"
                            onClick={() => {
                                setOpen(() => false);
                            }}
                            key={`navigation-link-${index + 1}`}
                        >
                            <p>
                                <span className="w-full z-[2] relative">
                                    <PerspectiveText
                                        label={label}
                                        SecondLabelClassName="text-rose-800/50"
                                    />
                                </span>
                            </p>
                            <p>
                                <span className="big-shoulders-font text-[max(2.5vw,1rem)] text-neutral-700">
                                    0{index + 1}
                                </span>
                            </p>
                            <div className="overlay absolute h-full bg-black/5 top-1/2 left-0 -translate-y-1/2" />{' '}
                        </a>
                    ))}
                </nav>
            </motion.div>
        </>
    );
};

export default Navigation;
