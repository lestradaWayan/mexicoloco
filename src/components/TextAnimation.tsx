import gsap from 'gsap';
import { motion, useInView, type HTMLMotionProps } from 'motion/react';
import { useEffect, useRef } from 'react';
import { cn } from '../utils';

const TextAnimation = ({
    children,
    classSelector,
    animationOptions,
    disableRepetition = false,
    disableViewDetection = false,
    className,
    customAnimation,
    ...props
}: {
    classSelector?: string;
    animationOptions?: gsap.TweenVars & {
        repetitionDelay?: number;
    };
    disableRepetition?: boolean;
    disableViewDetection?: boolean;
    customAnimation?: (
        elements: NodeListOf<Element>,
        timeline?: gsap.core.Timeline
    ) => void;
} & HTMLMotionProps<'div'>) => {
    const element = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const previousStateRef = useRef<boolean | null>(null);
    const firstAnimationCompleted = useRef<boolean>(false);
    const animationInProgress = useRef<boolean>(false);

    // Obtener el estado de visibilidad del elemento
    const isVisible = useInView(element);

    useEffect(() => {
        if (!element.current) return;

        // Limpiar cualquier animación anterior
        if (animationRef.current && !animationInProgress.current) {
            animationRef.current.kill();
        }

        // Seleccionar elementos solo dentro de esta instancia específica
        const targetElements = element.current.querySelectorAll(
            `.textAnimation ${
                classSelector
                    ? `.wrapperForTextAnimation.${classSelector}`
                    : '.wrapperForTextAnimation'
            } > span`
        );

        if (targetElements.length === 0) return;

        // Determinar si debemos animar basado en visibilidad
        const shouldAnimate =
            disableViewDetection ||
            (isVisible && previousStateRef.current !== isVisible);

        if (
            (!isVisible &&
                !disableViewDetection &&
                previousStateRef.current !== isVisible &&
                !disableRepetition) ||
            (!isVisible &&
                !disableViewDetection &&
                previousStateRef.current !== isVisible &&
                disableRepetition &&
                !firstAnimationCompleted.current)
        ) {
            if (!animationInProgress.current || !disableRepetition) {
                // Reiniciar la posición cuando el elemento sale de la vista
                gsap.set(targetElements, { y: '100%' });
            }
            previousStateRef.current = isVisible;
            return;
        }

        if (!shouldAnimate) {
            previousStateRef.current = isVisible;
            return;
        }

        // Si hay una animación personalizada, usarla
        if (customAnimation) {
            customAnimation(targetElements);
            firstAnimationCompleted.current = true;
            previousStateRef.current = isVisible;
            return;
        }

        // Crear opciones de animación base
        const animOptions = {
            y: '0%',
            duration: 0.75,
            ease: 'power3.out',
            ...animationOptions,
            onStart: () => {
                animationInProgress.current = true;
            },
            onComplete: () => {
                animationInProgress.current = false;
                firstAnimationCompleted.current = true;
            }
        };

        // Ajustar el delay para repeticiones
        if (
            (!disableViewDetection && firstAnimationCompleted.current) ||
            !disableRepetition
        ) {
            animOptions.delay = animationOptions?.repetitionDelay || 0;
        }

        // Crear la nueva animación solo si no es repetición y disableRepetition es true
        if (!firstAnimationCompleted.current || !disableRepetition) {
            animationRef.current = gsap.to(targetElements, animOptions);
        }

        previousStateRef.current = isVisible;

        // Limpieza al desmontar
        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [
        isVisible,
        classSelector,
        animationOptions,
        customAnimation,
        disableViewDetection,
        disableRepetition
    ]);

    return (
        <motion.div
            className={cn('textAnimation', className)}
            ref={element}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default TextAnimation;
