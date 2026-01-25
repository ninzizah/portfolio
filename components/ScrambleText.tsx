import React, { useState, useEffect } from 'react';

const ScrambleText: React.FC<{ text: string }> = ({ text }) => {
    // Binary and hex-like characters for "code" feel
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        let isCancelled = false;

        const animate = async () => {
            while (!isCancelled) {
                // 1. Show clear text for 3 seconds
                setDisplayText(text);
                await new Promise(r => setTimeout(r, 3000));

                if (isCancelled) break;

                // 2. Transform into "Code" (Binary/Hex style)
                const steps = 15;
                for (let i = 0; i <= steps; i++) {
                    if (isCancelled) break;
                    setDisplayText(prev =>
                        text.split('').map((char, index) => {
                            if (char === ' ' || char === '.') return char;
                            // Random binary or code snippet
                            if (Math.random() < 0.6) return Math.random() > 0.5 ? '1' : '0';
                            return char;
                        }).join('')
                    );
                    await new Promise(r => setTimeout(r, 60));
                }

                // 3. Digital "Matrix" state
                for (let i = 0; i < 8; i++) {
                    if (isCancelled) break;
                    setDisplayText(
                        text.split('').map((char) => {
                            if (char === ' ' || char === '.') return char;
                            return Math.random() > 0.5 ? '1' : '0';
                        }).join('')
                    );
                    await new Promise(r => setTimeout(r, 80));
                }

                // 4. Decode back to name
                for (let i = 0; i <= steps; i++) {
                    if (isCancelled) break;
                    setDisplayText(prev =>
                        text.split('').map((char, index) => {
                            if (char === ' ' || char === '.') return char;
                            if (index < (i / steps) * text.length) return text[index];
                            return Math.random() > 0.5 ? '1' : '0';
                        }).join('')
                    );
                    await new Promise(r => setTimeout(r, 50));
                }
            }
        };

        animate();
        return () => { isCancelled = true; };
    }, [text]);

    return <span className="inline-block whitespace-nowrap font-mono">{displayText}</span>;
};

export default ScrambleText;
