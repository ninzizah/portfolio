import React from 'react';
import {
    Code2,
    MapPin,
    Eye,
    Linkedin,
    Github,
    Instagram,
    Cpu,
    ShieldAlert,
    ShieldCheck,
} from 'lucide-react';
import { SiteConfig } from '../types';
import { cleanPhoneNumber } from '../services/helpers';

interface FooterProps {
    siteConfig: SiteConfig;
    handleViewCV: () => void;
    setShowLogin: (show: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ siteConfig, handleViewCV, setShowLogin }) => {
    return (
        <footer className="relative mt-32 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_2fr] gap-16 py-20 border-b border-white/5 mb-20">
                    <div className="space-y-8">
                        <div
                            className="flex items-center gap-3 text-indigo-500"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <Code2 className="w-10 h-10 cursor-pointer" />
                            <span className="text-2xl font-black text-white uppercase tracking-tighter cursor-pointer">
                                I.Am.Honore
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Elite engineering from Kigali to the world. Architecting the future of digital interaction.
                        </p>
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
                            <MapPin className="w-4 h-4 text-indigo-500" /> Kigali, Rwanda
                        </div>
                    </div>
                    <div>
                        <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-10">Navigation</h4>
                        <ul className="space-y-6">
                            <li>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                                >
                                    Repository
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                                >
                                    Research Archive
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleViewCV}
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2"
                                >
                                    View CV <Eye className="w-3 h-3" />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-10">Social Network</h4>
                        <ul className="space-y-6">
                            <li>
                                <a
                                    href={siteConfig.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-3"
                                >
                                    <Linkedin className="w-4 h-4" /> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/ninzizah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-3"
                                >
                                    <Github className="w-4 h-4" /> GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/i.am.honore"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-3"
                                >
                                    <Instagram className="w-4 h-4" /> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="glass p-10 rounded-[3rem] border-white/10 bg-white/[0.03] w-full shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Cpu className="w-20 h-20 text-indigo-500" />
                            </div>
                            <h4 className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.4em] mb-8 flex items-center gap-2">
                                <ShieldAlert className="w-3 h-3" /> Encrypted Line
                            </h4>
                            <a
                                href={`tel:${cleanPhoneNumber(siteConfig.phone)}`}
                                className="text-2xl lg:text-3xl font-black text-white block mb-6 hover:text-indigo-400 transition-all tracking-tight"
                            >
                                {siteConfig.phone}
                            </a>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                                System status: Online <br /> Global connection ready
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.6em]">{siteConfig.copyrightText}</p>
                    <div className="flex items-center gap-10">
                        <button
                            onClick={() => setShowLogin(true)}
                            className="text-[10px] font-black uppercase text-slate-700 hover:text-white transition-all flex items-center gap-3 tracking-[0.4em] group"
                        >
                            <ShieldCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" /> The Owner
                        </button>
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
