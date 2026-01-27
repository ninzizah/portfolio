import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, BookOpen, GraduationCap } from 'lucide-react';
import { SiteConfig, Project, Research } from '../types';

interface AboutProps {
    siteConfig: SiteConfig;
    projectsCount: number;
    researchCount: number;
}

const About: React.FC<AboutProps> = ({ siteConfig, projectsCount, researchCount }) => {
    return (
        <section id="about" className="py-16 px-6 max-w-6xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8 leading-tight"
                    >
                        The <br /> <span className="text-indigo-500">Architect.</span>
                    </motion.h2>
                    <div className="space-y-6 text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            {siteConfig.aboutText1}
                        </motion.p>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            {siteConfig.aboutText2}
                        </motion.p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-8 glass rounded-[2rem] border-white/5 text-center flex flex-col items-center justify-center gap-4"
                    >
                        <Terminal className="w-8 h-8 text-indigo-400" />
                        <div>
                            <h4 className="text-4xl font-black text-white">5+</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Years Active</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 glass rounded-[2rem] border-white/5 text-center flex flex-col items-center justify-center gap-4"
                    >
                        <Zap className="w-8 h-8 text-emerald-400" />
                        <div>
                            <h4 className="text-4xl font-black text-white">{projectsCount}+</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Systems Built</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 }}
                        className="p-8 glass rounded-[2rem] border-white/5 text-center flex flex-col items-center justify-center gap-4"
                    >
                        <BookOpen className="w-8 h-8 text-indigo-400" />
                        <div>
                            <h4 className="text-4xl font-black text-white">{researchCount}+</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Research Items</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 glass rounded-[2rem] border-white/5 text-center flex flex-col items-center justify-center gap-4"
                    >
                        <GraduationCap className="w-8 h-8 text-indigo-400" />
                        <div>
                            <h4 className="text-[10px] font-black text-white uppercase tracking-tight leading-tight">
                                Mount Kenya University Graduate
                            </h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">Education</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
