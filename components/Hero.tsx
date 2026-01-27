import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, User } from 'lucide-react';
import ScrambleText from './ScrambleText';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import { SiteConfig } from '../types';

interface HeroProps {
    siteConfig: SiteConfig;
    handleViewCV: () => void;
    setShowLogin: (show: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ siteConfig, handleViewCV, setShowLogin }) => {
    const nameParts = siteConfig.heroName.split(/([\s.])/);

    return (
        <section className="min-h-[80vh] px-6 lg:px-12 pt-40 pb-20 max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-10 lg:gap-12 relative z-10">
            <div className="flex flex-col items-start text-left min-w-0">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 flex items-center gap-4"
                >
                    <div className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                        Status: Integrated / Senior Architect
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-tight break-words whitespace-pre-wrap"
                >
                    {nameParts.map((part, i) => (
                        <span key={i} className="inline-block min-h-[0.8em]">
                            {/* Cycle between text and code effect */}
                            {/[\s.]/.test(part) ? part : <ScrambleText text={part} />}
                        </span>
                    ))}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-base text-slate-400 max-w-lg mb-8 leading-relaxed font-semibold opacity-70"
                >
                    {siteConfig.heroSub}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-6"
                >
                    <MagneticButton
                        onClick={() => {
                            if (siteConfig.githubUrl && siteConfig.githubUrl !== '#') {
                                window.open(siteConfig.githubUrl, '_blank');
                            } else {
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-10 py-5 bg-indigo-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl flex items-center gap-3 hover:bg-indigo-500 transition-colors shadow-2xl shadow-indigo-600/40"
                    >
                        Enter Repository <ArrowRight className="w-5 h-5" />
                    </MagneticButton>
                    <MagneticButton
                        onClick={handleViewCV}
                        className="px-10 py-5 glass text-white font-black uppercase text-xs tracking-widest rounded-2xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-3"
                    >
                        Scan CV <Eye className="w-5 h-5" />
                    </MagneticButton>
                </motion.div>

                {/* Mobile-only image to ensure visibility on small screens */}
                <div className="w-full aspect-square mt-10 relative lg:hidden block">
                    <div className="w-full h-full rounded-[3rem] glass p-4 border-white/10 shadow-3xl relative overflow-hidden">
                        {siteConfig.heroImage ? (
                            <img
                                src={siteConfig.heroImage}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-[2rem]"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-[2rem]">
                                <User className="w-16 h-16 text-slate-700" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-[280px] mx-auto aspect-[4/5] relative hidden lg:block"
            >
                <TiltCard className="w-full h-full">
                    <div className="flex-1 relative w-full max-w-md lg:max-w-lg mx-auto">
                        {/* Responsive Image Container */}
                        <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl bg-white/5">
                            {siteConfig.heroImage ? (
                                <img
                                    src={siteConfig.heroImage}
                                    alt="Honore"
                                    className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-700">
                                    No Image
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                </TiltCard>
            </motion.div>
        </section>
    );
};

export default Hero;
