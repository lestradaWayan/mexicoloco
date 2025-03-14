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
    ...props
}: {
    classSelector: string;
    animationOptions?: gsap.TweenVars & {
        repetitionDelay?: number;
    };
    disableRepetition?: boolean;
    disableViewDetection?: boolean;
} & HTMLMotionProps<'div'>) => {
    const element = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const previousStateRef = useRef<boolean | null>(null);
    const firstAnimationCompleted = useRef<boolean>(false);

    // Obtener el estado de visibilidad del elemento
    const isVisible = useInView(element);

    useEffect(() => {
        if (!element.current) return;

        if (disableViewDetection) {
            // Limpiar cualquier animación anterior
            if (animationRef.current) {
                animationRef.current.kill();
            }

            // Importante: Seleccionar elementos solo dentro de esta instancia específica
            const targetElements = element.current.querySelectorAll(
                `.${classSelector} > span`
            );

            if (targetElements.length === 0) return;

            const animOptions = {
                y: '0%',
                duration: 0.75,
                ease: 'power3.out',
                ...animationOptions
            };

            animationRef.current = gsap.to(targetElements, animOptions);

            // Marcar que la primera animación se ha completado
            firstAnimationCompleted.current = true;
        } else {
            if (isVisible && previousStateRef.current !== isVisible) {
                // Limpiar cualquier animación anterior
                if (animationRef.current) {
                    animationRef.current.kill();
                }

                // Importante: Seleccionar elementos solo dentro de esta instancia específica
                const targetElements = element.current.querySelectorAll(
                    `.${classSelector} > span`
                );

                if (targetElements.length === 0) return;

                // Asegurarse que los elementos empiezan en su posición inicial
                if (!disableRepetition) {
                    gsap.set(targetElements, {
                        y: '100%'
                    });
                }

                // Crear opciones de animación
                const animOptions = {
                    y: '0%',
                    duration: 0.75,
                    ease: 'power3.out',
                    ...animationOptions
                };

                // Si no es la primera ejecución, eliminar cualquier delay
                if (firstAnimationCompleted.current) {
                    animOptions.delay = animationOptions?.repetitionDelay || 0;
                } else {
                }

                // Crear la nueva animación usando los elementos específicos de esta instancia
                animationRef.current = gsap.to(targetElements, animOptions);

                // Marcar que la primera animación se ha completado
                firstAnimationCompleted.current = true;
            }

            // Actualizar el estado anterior
            previousStateRef.current = isVisible;
        }

        // Solo ejecutar la animación cuando el elemento se vuelve visible
        // y no estaba visible antes (o es la primera vez)

        // Limpieza al desmontar
        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [isVisible, classSelector, animationOptions]);

    return (
        <motion.div className={cn(className)} ref={element} {...props}>
            {children}
        </motion.div>
    );
};

export default TextAnimation;
