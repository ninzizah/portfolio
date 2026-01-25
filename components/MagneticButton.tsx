import React, { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface MagneticButtonProps {
    children?: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    target?: string;
    download?: string | boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, href, onClick, target, download }) => {
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.2);
        y.set((clientY - centerY) * 0.2);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };
    if (href) return (
        <motion.a href={href} target={target} rel="noopener noreferrer" download={download} ref={ref as any} style={{ x, y }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
            {children}
        </motion.a>
    );
    return (
        <motion.button onClick={onClick} ref={ref as any} style={{ x, y }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
            {children}
        </motion.button>
    );
};

export default MagneticButton;
