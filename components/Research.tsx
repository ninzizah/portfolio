import React from 'react';
import { motion } from 'framer-motion';
import { Layers, FileSearch, Briefcase, ExternalLink, Download } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { Research as ResearchType } from '../types';

interface ResearchProps {
    research: ResearchType[];
}

const Research: React.FC<ResearchProps> = ({ research }) => {
    if (research.length === 0) return null;

    return (
        <section id="research" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                <div>
                    <span className="text-emerald-500 font-black uppercase text-xs tracking-[0.5em] mb-4 block">Knowledge Hub</span>
                    <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8]">
                        Research <br /> Archive.
                    </h2>
                </div>
                <p className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed">
                    Academic and applied research investigating the frontiers of ICT, business information systems, and AI-driven solutions.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {(research || []).map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="glass p-12 rounded-[4rem] border-white/5 h-full flex flex-col group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Layers className="w-24 h-24 text-emerald-500" />
                            </div>

                            {item.imageUrl && (
                                <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden mb-10 border border-white/10">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <FileSearch className="w-7 h-7 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{item.date}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            {item.publisher || 'Applied Research'}
                                        </p>
                                    </div>
                                </div>
                                {item.role && (
                                    <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2">
                                        <Briefcase className="w-3 h-3" /> Role: {item.role}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tight leading-[1.1]">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 text-base leading-relaxed mb-12 flex-grow line-clamp-6">{item.abstract}</p>

                            <div className="flex flex-wrap gap-3 mb-12">
                                {(item.tags || []).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-6 mt-auto">
                                {item.link && (
                                    <MagneticButton
                                        href={item.link}
                                        target="_blank"
                                        className="flex-1 py-5 glass border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5"
                                    >
                                        View Paper <ExternalLink className="w-4 h-4" />
                                    </MagneticButton>
                                )}
                                {item.pdfUrl && (
                                    <MagneticButton
                                        href={item.pdfUrl}
                                        download
                                        className="flex-1 py-5 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 shadow-xl shadow-emerald-600/20"
                                    >
                                        Download PDF <Download className="w-4 h-4" />
                                    </MagneticButton>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Research;
