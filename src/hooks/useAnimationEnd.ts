import { useEffect, useRef, useState } from "react";

export const useAnimationEnd = () => {
    const characterDivRef = useRef<HTMLDivElement>(null);
    const [isAnimationEnded, setIsAnimationEnded] = useState(false);

    useEffect(() => {
        const handleAnimationEnd = () => {
            console.log('animation ended')
            setIsAnimationEnded(true);
        }

        const element = characterDivRef.current;
        if (element) { // Check if the element is not null
            element.addEventListener('animationend', handleAnimationEnd);
        }
        return () => {
            if (element) { // Check if the element is not null
                element.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }, [isAnimationEnded]);

    return {characterDivRef, isAnimationEnded};
}