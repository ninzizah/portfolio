import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import TiltCard from './TiltCard';
import { Project } from '../types';

interface ProjectsProps {
    projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    // Track which project video is currently playing by ID
    const [playingVideoId, setPlayingVideoId] = React.useState<string | null>(null);

    return (
        <section id="projects" className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-6 gap-10">
                <div>
                    <span className="text-indigo-500 font-black uppercase text-xs tracking-[0.5em] mb-4 block">Registry</span>
                    <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.8]">
                        Software <br /> Ecosystem.
                    </h2>
                </div>
                <p className="text-slate-500 max-w-sm text-xs font-medium leading-relaxed">
                    Curated architectural builds across web, mobile, and system infrastructures. Each solution is a step toward
                    global digital transformation.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
                {(projects || []).map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <TiltCard className="h-full">
                            <div className="glass rounded-[2.5rem] overflow-hidden border-white/5 h-full group transition-all hover:border-indigo-500/20">
                                <div className="aspect-video relative overflow-hidden bg-black">
                                    {project.videoUrl && playingVideoId === project.id ? (
                                        <video
                                            src={project.videoUrl}
                                            controls
                                            autoPlay
                                            className="w-full h-full object-cover"
                                            poster={project.imageUrl}
                                        />
                                    ) : (
                                        <div className="relative w-full h-full">
                                            {/* Image Background */}
                                            <img
                                                src={project.imageUrl || ''}
                                                alt={project.title}
                                                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                                            />
                                            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />

                                            {/* Play Button Overlay */}
                                            {project.videoUrl && (
                                                <button
                                                    onClick={() => setPlayingVideoId(project.id!)}
                                                    className="absolute inset-0 flex items-center justify-center z-20 group/play"
                                                >
                                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover/play:scale-110 transition-transform">
                                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.4em]">
                                            {project.year}
                                        </span>
                                        <div className="flex gap-4">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 glass border-white/10 rounded-2xl hover:text-indigo-400 hover:bg-white/5 transition-all"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 glass border-white/10 rounded-2xl hover:text-indigo-400 hover:bg-white/5 transition-all"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{project.title}</h3>
                                    <p className="text-slate-400 text-base leading-relaxed mb-8 line-clamp-3">{project.description}</p>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
