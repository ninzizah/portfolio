import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    LogOut,
    PlusCircle,
    Trash2,
    ImageIcon,
    Link as LinkIcon,
    Github,
    FileText,
    CheckCircle2,
} from 'lucide-react';
import { SiteConfig, Project, Research } from '../types';

interface AdminPortalProps {
    isAdminPortalOpen: boolean;
    handleLogout: () => void;
    activeTab: 'settings' | 'projects' | 'research' | 'skills' | 'messages';
    setActiveTab: (tab: 'settings' | 'projects' | 'research' | 'skills' | 'messages') => void;
    tempConfig: SiteConfig | null;
    setTempConfig: (config: SiteConfig | null) => void;
    handleSaveConfig: () => Promise<void>;
    editingProject: Partial<Project> | null;
    setEditingProject: (project: Partial<Project> | null) => void;
    projects: Project[];
    handleSaveProject: () => Promise<void>;
    handleDeleteProject: (id: string) => Promise<void>;
    handleProjectImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editingResearch: Partial<Research> | null;
    setEditingResearch: (research: Partial<Research> | null) => void;
    research: Research[];
    handleSaveResearch: () => Promise<void>;
    handleDeleteResearch: (id: string) => Promise<void>;
    handleResearchImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCVUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleHeroImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // New Skills Props
    skills: any[];
    handleSaveSkill: (skill: any) => Promise<void>;
    handleDeleteSkill: (id: string) => Promise<void>;
    messages: any[];
    handleDeleteMessage: (id: string) => Promise<void>;
}

const AdminPortal: React.FC<AdminPortalProps> = ({
    isAdminPortalOpen,
    handleLogout,
    activeTab,
    setActiveTab,
    tempConfig,
    setTempConfig,
    handleSaveConfig,
    editingProject,
    setEditingProject,
    projects,
    handleSaveProject,
    handleDeleteProject,
    handleProjectImageUpload,
    editingResearch,
    setEditingResearch,
    research,
    handleSaveResearch,
    handleDeleteResearch,
    handleResearchImageUpload,
    handleCVUpload,
    handleHeroImageUpload,
    skills,
    handleSaveSkill,
    handleDeleteSkill,
    messages,
    handleDeleteMessage,
}) => {
    return (
        <AnimatePresence>
            {isAdminPortalOpen && (
                <div className="fixed inset-0 z-[210] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleLogout}
                        className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl"
                    />
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="glass w-full max-w-7xl h-[90vh] rounded-[4.5rem] relative z-10 flex flex-col md:flex-row overflow-hidden border-indigo-500/10 shadow-3xl"
                    >
                        <div className="w-full md:w-80 bg-white/[0.03] p-14 flex flex-col justify-between border-r border-white/5">
                            <div>
                                <h2 className="text-xl font-black text-white mb-16 flex items-center gap-4 uppercase tracking-widest">
                                    <Settings className="w-7 h-7 text-indigo-500" /> Kernel Hub
                                </h2>
                                <nav className="space-y-5">
                                    {['settings', 'projects', 'research', 'skills', 'messages'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab as any)}
                                            className={`w-full text-left px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all ${activeTab === tab
                                                ? 'bg-indigo-600 text-white shadow-2xl'
                                                : 'text-slate-500 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full py-5 text-red-500 font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
                            >
                                <LogOut className="w-5 h-5" /> Logout
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-16 bg-slate-950/40">
                            {activeTab === 'settings' && tempConfig && (
                                <div className="space-y-14 max-w-5xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                Full Identity
                                            </label>
                                            <input
                                                type="text"
                                                value={tempConfig.heroName}
                                                onChange={(e) => setTempConfig({ ...tempConfig, heroName: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                Catchphrase / Subline
                                            </label>
                                            <input
                                                type="text"
                                                value={tempConfig.heroSub}
                                                onChange={(e) => setTempConfig({ ...tempConfig, heroSub: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                Email Gateway
                                            </label>
                                            <input
                                                type="email"
                                                value={tempConfig.email}
                                                onChange={(e) => setTempConfig({ ...tempConfig, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                Phone Direct
                                            </label>
                                            <input
                                                type="text"
                                                value={tempConfig.phone}
                                                onChange={(e) => setTempConfig({ ...tempConfig, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                WhatsApp Relay
                                            </label>
                                            <input
                                                type="text"
                                                value={tempConfig.whatsapp}
                                                onChange={(e) => setTempConfig({ ...tempConfig, whatsapp: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                LinkedIn Archive
                                            </label>
                                            <input
                                                type="text"
                                                value={tempConfig.linkedin}
                                                onChange={(e) => setTempConfig({ ...tempConfig, linkedin: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                GitHub Repository
                                            </label>
                                            <input
                                                type="text"
                                                value={tempConfig.githubUrl}
                                                onChange={(e) => setTempConfig({ ...tempConfig, githubUrl: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                            Main Narrative Paragraph 1
                                        </label>
                                        <textarea
                                            value={tempConfig.aboutText1}
                                            onChange={(e) => setTempConfig({ ...tempConfig, aboutText1: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-medium h-32"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                            Main Narrative Paragraph 2
                                        </label>
                                        <textarea
                                            value={tempConfig.aboutText2}
                                            onChange={(e) => setTempConfig({ ...tempConfig, aboutText2: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-medium h-32"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                            Footer Copyright (e.g. © 2025 Honore)
                                        </label>
                                        <input
                                            type="text"
                                            value={tempConfig.copyrightText || ''}
                                            onChange={(e) => setTempConfig({ ...tempConfig, copyrightText: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                Curriculum Vitae (PDF/Doc)
                                            </label>
                                            <div className="flex items-center gap-6">
                                                <label className="flex-1 bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] p-10 text-center cursor-pointer group hover:border-indigo-500/50 transition-all">
                                                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCVUpload} />
                                                    <FileText className="w-10 h-10 text-indigo-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                                                        Scan & Upload CV
                                                    </span>
                                                </label>
                                                {tempConfig.cvUrl && (
                                                    <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em]">
                                                Hero Imagery
                                            </label>
                                            <div className="flex items-center gap-6">
                                                <label className="flex-1 bg-white/5 border-2 border-dashed border-white/10 rounded-[2rem] p-10 text-center cursor-pointer group hover:border-indigo-500/50 transition-all">
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleHeroImageUpload} />
                                                    <ImageIcon className="w-10 h-10 text-indigo-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                                                        Select Portrait
                                                    </span>
                                                </label>
                                                {tempConfig.heroImage && (
                                                    <img
                                                        src={tempConfig.heroImage}
                                                        alt="Hero"
                                                        className="w-20 h-20 rounded-2xl object-cover border border-white/10"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-white/5">
                                        <button
                                            onClick={handleSaveConfig}
                                            className="px-16 py-6 bg-indigo-600 text-white font-black rounded-3xl shadow-2xl hover:bg-indigo-500 transition-all uppercase text-[10px] tracking-[0.4em]"
                                        >
                                            Commit to Core
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'projects' && (
                                <div className="space-y-14">
                                    {!editingProject ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setEditingProject({
                                                        title: '',
                                                        year: '2025',
                                                        description: '',
                                                        tags: [],
                                                        link: '',
                                                        github: '',
                                                    })
                                                }
                                                className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] flex items-center gap-4 hover:bg-indigo-500 shadow-2xl transition-all tracking-widest"
                                            >
                                                <PlusCircle className="w-6 h-6" /> New Node
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {projects.map((p) => (
                                                    <div
                                                        key={p.id}
                                                        className="p-10 glass rounded-[3rem] border-white/5 flex flex-col justify-between hover:border-indigo-500/20 transition-all"
                                                    >
                                                        <div>
                                                            <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">
                                                                {p.title}
                                                            </h4>
                                                            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">
                                                                {p.year}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-6 mt-10">
                                                            <button
                                                                onClick={() => setEditingProject(p)}
                                                                className="flex-1 py-4 bg-white/5 rounded-2xl text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProject(p.id! || (p as any)._id)}
                                                                className="p-4 bg-white/5 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="max-w-4xl space-y-10 glass p-14 rounded-[4rem] border-white/10">
                                            <h4 className="text-2xl font-black text-white mb-10 uppercase tracking-widest">Node Schema</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        Node Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Title"
                                                        value={editingProject.title}
                                                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        Launch Year
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Year"
                                                        value={editingProject.year}
                                                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        Live Ecosystem Link (URL)
                                                    </label>
                                                    <div className="relative">
                                                        <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                                        <input
                                                            type="text"
                                                            placeholder="https://example.com"
                                                            value={editingProject.link || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        Source Registry (GitHub)
                                                    </label>
                                                    <div className="relative">
                                                        <Github className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                                        <input
                                                            type="text"
                                                            placeholder="https://github.com/..."
                                                            value={editingProject.github || ''}
                                                            onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                    Brief Summary
                                                </label>
                                                <textarea
                                                    placeholder="Describe the mission and technical architecture..."
                                                    value={editingProject.description}
                                                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white h-48 font-medium outline-none focus:border-indigo-500 transition-all"
                                                />
                                            </div>
                                            <div className="flex items-center gap-10">
                                                <div className="flex-1 space-y-4">
                                                    <label className="block flex-1 bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] p-10 text-center cursor-pointer group hover:border-indigo-500/50 transition-all">
                                                        <input type="file" accept="image/*" className="hidden" onChange={handleProjectImageUpload} />
                                                        <ImageIcon className="w-10 h-10 text-indigo-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                                            Link Visual
                                                        </span>
                                                    </label>
                                                    <label className="block flex-1 bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] p-10 text-center cursor-pointer group hover:border-indigo-500/50 transition-all">
                                                        <input type="file" accept="video/*" className="hidden" onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file && editingProject) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => setEditingProject({ ...editingProject, videoUrl: reader.result as string });
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }} />
                                                        <span className="text-3xl mb-2 block">🎥</span>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                                            Upload Demo Video
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    {editingProject.imageUrl && (
                                                        <img
                                                            src={editingProject.imageUrl}
                                                            alt="Project"
                                                            className="w-56 aspect-video rounded-3xl object-cover border border-white/10"
                                                        />
                                                    )}
                                                    {editingProject.videoUrl && (
                                                        <div className="w-56 aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black">
                                                            <video src={editingProject.videoUrl} controls className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-6 pt-10">
                                                <button
                                                    onClick={handleSaveProject}
                                                    className="flex-1 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl hover:bg-indigo-500 transition-all uppercase text-[10px] tracking-[0.3em]"
                                                >
                                                    Deploy Node
                                                </button>
                                                <button
                                                    onClick={() => setEditingProject(null)}
                                                    className="flex-1 py-5 glass border-white/10 text-white font-black rounded-2xl uppercase text-[10px] tracking-[0.3em]"
                                                >
                                                    Abort
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'research' && (
                                <div className="space-y-14">
                                    {!editingResearch ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setEditingResearch({
                                                        title: '',
                                                        date: '2025',
                                                        abstract: '',
                                                        tags: [],
                                                        link: '',
                                                        pdfUrl: '',
                                                        imageUrl: '',
                                                        role: '',
                                                    })
                                                }
                                                className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] flex items-center gap-4 hover:bg-emerald-500 shadow-2xl transition-all tracking-widest"
                                            >
                                                <PlusCircle className="w-6 h-6" /> New Publication
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {research.map((r) => (
                                                    <div
                                                        key={r.id}
                                                        className="p-10 glass rounded-[3rem] border-white/5 flex flex-col justify-between hover:border-emerald-500/20 transition-all"
                                                    >
                                                        <div>
                                                            <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">
                                                                {r.title}
                                                            </h4>
                                                            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
                                                                {r.date}
                                                            </p>
                                                            {r.role && (
                                                                <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.4em] mt-2">
                                                                    Role: {r.role}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-6 mt-10">
                                                            <button
                                                                onClick={() => setEditingResearch(r)}
                                                                className="flex-1 py-4 bg-white/5 rounded-2xl text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteResearch(r.id! || (r as any)._id)}
                                                                className="p-4 bg-white/5 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="max-w-4xl space-y-10 glass p-14 rounded-[4rem] border-white/10">
                                            <h4 className="text-2xl font-black text-white mb-10 uppercase tracking-widest">Research Schema</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        Publication Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Title"
                                                        value={editingResearch.title}
                                                        onChange={(e) => setEditingResearch({ ...editingResearch, title: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-emerald-500 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        Date / Year
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Date/Year"
                                                        value={editingResearch.date}
                                                        onChange={(e) => setEditingResearch({ ...editingResearch, date: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-emerald-500 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        Your Role / Contribution
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Lead Architect, Researcher, Contributor"
                                                        value={editingResearch.role || ''}
                                                        onChange={(e) => setEditingResearch({ ...editingResearch, role: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                        External Reference URL
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="External URL"
                                                        value={editingResearch.link || ''}
                                                        onChange={(e) => setEditingResearch({ ...editingResearch, link: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold outline-none focus:border-emerald-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.4em]">
                                                    Detailed Abstract
                                                </label>
                                                <textarea
                                                    placeholder="Describe the mission, findings, and participation details..."
                                                    value={editingResearch.abstract}
                                                    onChange={(e) => setEditingResearch({ ...editingResearch, abstract: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white h-48 font-medium outline-none focus:border-emerald-500 transition-all"
                                                />
                                            </div>

                                            <div className="flex items-center gap-10">
                                                <label className="flex-1 bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] p-14 text-center cursor-pointer group hover:border-emerald-500/50 transition-all">
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleResearchImageUpload} />
                                                    <ImageIcon className="w-12 h-12 text-emerald-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                                        Inject Research Visual
                                                    </span>
                                                </label>
                                                {editingResearch.imageUrl && (
                                                    <img
                                                        src={editingResearch.imageUrl}
                                                        alt="Research"
                                                        className="w-56 aspect-video rounded-3xl object-cover border border-white/10"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex gap-6 pt-10">
                                                <button
                                                    onClick={handleSaveResearch}
                                                    className="flex-1 py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-2xl hover:bg-emerald-500 transition-all uppercase text-[10px] tracking-[0.3em]"
                                                >
                                                    Deploy Research
                                                </button>
                                                <button
                                                    onClick={() => setEditingResearch(null)}
                                                    className="flex-1 py-5 glass border-white/10 text-white font-black rounded-2xl uppercase text-[10px] tracking-[0.3em]"
                                                >
                                                    Abort
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'skills' && (
                                <div className="space-y-14 max-w-5xl">
                                    <button
                                        onClick={() => handleSaveSkill({ category: 'New Category', items: [] })}
                                        className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] flex items-center gap-4 hover:bg-indigo-500 shadow-2xl transition-all tracking-widest"
                                    >
                                        <PlusCircle className="w-6 h-6" /> Add Skill Category
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {(skills || []).map((cat, ci) => (
                                            <div key={cat.id || ci} className="p-10 glass rounded-[3rem] border-white/5 relative group">
                                                <button
                                                    onClick={() => handleDeleteSkill(cat.id)}
                                                    className="absolute top-6 right-6 p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>

                                                <div className="mb-8">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em] block mb-2">Category Name</label>
                                                    <input
                                                        type="text"
                                                        value={cat.category}
                                                        onChange={(e) => {
                                                            const updated = { ...cat, category: e.target.value };
                                                            handleSaveSkill(updated);
                                                        }}
                                                        onBlur={(e) => handleSaveSkill({ ...cat, category: e.target.value })}
                                                        className="bg-transparent text-xl font-black text-indigo-400 outline-none w-full border-b border-transparent focus:border-indigo-500/20 uppercase tracking-tighter"
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 px-2 tracking-[0.3em] block">Skills (Comma Separated)</label>
                                                    <textarea
                                                        value={Array.isArray(cat.items) ? cat.items.join(', ') : (cat.items || '')}
                                                        onChange={(e) => {
                                                            // Local change logic if needed
                                                        }}
                                                        onBlur={(e) => {
                                                            const val = e.target.value || '';
                                                            const items = val.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '');
                                                            handleSaveSkill({ ...cat, items });
                                                        }}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 font-bold outline-none h-32 focus:border-indigo-500 transition-all"
                                                        placeholder="React, TypeScript, Node.js..."
                                                    />
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest pl-2">
                                                        * Separate items with commas
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'messages' && (
                                <div className="space-y-10">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-10">Transmission Archive</h3>
                                    {messages.length === 0 ? (
                                        <div className="glass p-20 rounded-[3rem] text-center border-white/5">
                                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No active transmissions in archive.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-6">
                                            {messages.map((m: any) => (
                                                <div key={m.id} className="glass p-10 rounded-[3rem] border-white/5 relative group hover:border-indigo-500/20 transition-all">
                                                    <button
                                                        onClick={() => handleDeleteMessage(m.id)}
                                                        className="absolute top-10 right-10 p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Originator</p>
                                                                <p className="text-white font-black text-lg">{m.name}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Contact Gateway</p>
                                                                <p className="text-indigo-400 font-bold">{m.email}</p>
                                                                {m.phone && <p className="text-slate-400 text-xs font-medium">{m.phone}</p>}
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Timestamp</p>
                                                                <p className="text-slate-500 text-[10px] font-bold">
                                                                    {new Date(m.created_at).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                                <FileText className="w-3 h-3 text-indigo-500" /> Payload Data
                                                            </p>
                                                            <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                                                                {m.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdminPortal;
