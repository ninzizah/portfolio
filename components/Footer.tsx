import React from 'react';
import {
    Code2,
    MapPin,
    Eye,
    Linkedin,
    Github,
    Instagram,
    Mail,
    Send,
    Terminal,
} from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
    siteConfig: SiteConfig;
    handleViewCV: () => void;
    setShowLogin: (show: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ siteConfig, handleViewCV, setShowLogin }) => {
    return (
        <footer className="relative mt-20 border-t border-white/5 bg-[#020617]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20 border-b border-white/5 pb-20">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div
                            className="flex items-center gap-3 text-indigo-500 cursor-pointer group"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <div className="p-2 bg-indigo-600/10 rounded-lg group-hover:bg-indigo-600/20 transition-colors">
                                <Code2 className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-black text-white uppercase tracking-tighter">
                                I.Am.Honore
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
                            Architecting high-performance digital systems. Available for strategic partnerships and engineering briefings.
                        </p>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                            <MapPin className="w-3 h-3 text-indigo-500" /> Kigali, Rwanda
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="text-slate-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest"
                                >
                                    Index
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-slate-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest"
                                >
                                    Registry
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleViewCV}
                                    className="text-slate-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                                >
                                    CV_SCAN <Eye className="w-3 h-3" />
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-8">Socials</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ninzizah" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Github className="w-3.5 h-3.5" /> GitHub
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${siteConfig.email}`} className="text-slate-500 hover:text-indigo-400 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" /> Direct_Mail
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact CTA */}
                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group">
                            <h4 className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.4em] mb-6 flex items-center gap-2">
                                <Terminal className="w-3 h-3" /> System_Access
                            </h4>
                            <p className="text-white text-lg font-black tracking-tight mb-6">
                                Start a project briefing or request consultation.
                            </p>
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="w-full py-4 px-6 bg-white/5 hover:bg-indigo-600 text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-xl transition-all flex items-center justify-center gap-3 group/btn"
                            >
                                <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /> Initialize_Uplink
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-6">
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.5em]">
                        &copy; 2026 NINZIZA SHEMA HONORE
                    </p>
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setShowLogin(true)}
                            className="text-[9px] font-black uppercase text-slate-700 hover:text-indigo-500 transition-colors tracking-[0.4em]"
                        >
                            Log_Access
                        </button>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    </div>
                </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </footer>
    );
};

export default Footer;
