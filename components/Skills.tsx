import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';

interface SkillsProps {
    siteConfig: SiteConfig;
    skills: any[];
}

const Skills: React.FC<SkillsProps> = ({ siteConfig, skills }) => {
    // Fallback to siteConfig if DB skills are empty (though we seeded them)
    const displaySkills = skills.length > 0 ? skills : siteConfig.skillsCategories;

    return (
        <section id="skills" className="py-16 px-6 max-w-6xl mx-auto border-t border-white/5">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-16">Deep Technical Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(displaySkills || []).map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="glass p-8 rounded-[2rem] border-white/5 h-full hover:border-indigo-500/20 transition-all group">
                            <h3 className="text-indigo-400 font-black uppercase text-xs tracking-[0.4em] mb-10 flex items-center gap-3">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                {cat?.category || 'Category'}
                            </h3>
                            <ul className="space-y-5">
                                {(cat?.items || []).map((item: string, idx: number) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-4 text-slate-300 font-bold text-sm hover:text-white transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-500 transition-colors" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
