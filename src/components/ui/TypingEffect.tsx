// components/ui/TypingEffect.tsx
import React, { useEffect, useState } from 'react';

interface TypingEffectProps {
    text: string[];
    speed?: number;
    deleteSpeed?: number;
    className?: string;
    loop?: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 120, deleteSpeed = 50, className, loop = false }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (loop || (textIndex < text.length && !isDeleting)) {
                const currentText = text[textIndex];

                if (!isDeleting) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                    if (displayText.length === currentText.length - 1) {
                        if (loop) {
                            setIsDeleting(true);
                        }
                    }
                } else {
                    setDisplayText(prev => prev.slice(0, -1));
                    if (displayText.length === 0) {
                        setIsDeleting(false);
                        if (loop || textIndex < text.length - 1) {
                            setTextIndex(prev => (prev + 1) % text.length);
                        }
                    }
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, text, textIndex, speed, deleteSpeed, loop]);

    return (
        <div className={`h-full ${className}`}>
            <div className="text-primary">{displayText}</div>
        </div>
    );
};

export default TypingEffect;
