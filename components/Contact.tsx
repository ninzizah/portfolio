import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    UserCheck,
    User,
    AtSign,
    Smartphone,
    MessageSquare,
    Send,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import MagneticButton from './MagneticButton';
import { SiteConfig } from '../types';

interface ContactProps {
    siteConfig: SiteConfig;
    contactForm: { name: string; email: string; phone: string; message: string };
    setContactForm: (form: { name: string; email: string; phone: string; message: string }) => void;
    isSending: boolean;
    showSuccess: boolean;
    setShowSuccess: (show: boolean) => void;
}

const Contact: React.FC<ContactProps> = ({
    siteConfig,
    contactForm,
    setContactForm,
    isSending,
    showSuccess,
    setShowSuccess,
}) => {
    // Determine the state setter for sending status based on props or local state if we needed it,
    // but here we are receiving isSending as a prop.
    // Ideally, the parent should handle the submission logic if it manages the state.
    // However, per the task, we are moving logic here. Since `isSending` is a prop, we can't set it directly unless we have a setter.
    // Let's assume for now we perform the fetch here but we might need a setter for isSending passed down, OR we manage isSending locally if we detach from parent completely.
    // The previous App.tsx used local state. Let's fix the architecture properly.
    // For this quick fix, we'll assume we need to manage the submit here, but we can't flip 'isSending' prop.
    // Actually, checking App.tsx, it still passes isSending.
    // Getting messy. Let's make this component fully autonomous for the form logic or require the props.
    // For simplicity: We will trigger the API call here and ignore the prop limitation by just doing the alert for now or (better) we should have asked for setIsSending prop.
    // Wait, the previous edit removed handleSendUplink from props, so we MUST define it here.

    // We need a local state for loading if we can't control the parent's isSending.
    const [localIsSending, setLocalIsSending] = React.useState(false);

    const handleSendUplink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalIsSending(true);

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactForm),
            });

            if (response.ok) {
                setShowSuccess(true);
                setContactForm({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error connecting to server. Ensure backend is running.');
        } finally {
            setLocalIsSending(false);
        }
    };

    const loadingState = isSending || localIsSending;

    return (
        <section id="contact" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-10 leading-[0.8]"
                    >
                        Initialize <br /> Connection.
                    </motion.h2>
                    <p className="text-slate-400 text-xl font-medium max-w-md mb-12">
                        Have a complex problem to solve or a research opportunity? Send your briefing directly to my architecture
                        hub.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 p-6 glass rounded-[2rem] border-white/5">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                                <Mail className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Email</p>
                                <p className="text-white font-bold">{siteConfig.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 p-6 glass rounded-[2rem] border-white/5">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <WhatsAppIcon className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WhatsApp Relay</p>
                                <p className="text-white font-bold">{siteConfig.whatsapp}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="glass p-12 rounded-[4rem] border-white/10 bg-white/[0.02] relative overflow-hidden shadow-3xl">
                    <AnimatePresence>
                        {loadingState && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-indigo-600/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center"
                            >
                                <Loader2 className="w-20 h-20 text-white animate-spin mb-10" />
                                <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] mb-4">Processing Payload</h3>
                                <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                                    Establishing Secure Route...
                                </p>
                            </motion.div>
                        )}
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 z-50 bg-[#020617]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-6">Message Sent</h3>
                                <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">
                                    Your secure transmission has been stored in the database archive. I will review it shortly.
                                </p>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="px-10 py-5 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-indigo-500 transition-all"
                                >
                                    Return to Hub
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <form onSubmit={handleSendUplink} className="space-y-8">
                        <div className="space-y-6">
                            <label className="text-[10px] font-black uppercase text-indigo-400 px-2 tracking-[0.4em] flex items-center gap-2 mb-4">
                                <UserCheck className="w-4 h-4" /> Identification
                            </label>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Name"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-indigo-500 font-bold placeholder:text-slate-800 transition-all shadow-inner"
                                    />
                                </div>
                                <div className="relative group">
                                    <AtSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-indigo-500 font-bold placeholder:text-slate-800 transition-all shadow-inner"
                                    />
                                </div>
                                <div className="relative group">
                                    <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={contactForm.phone}
                                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-indigo-500 font-bold placeholder:text-slate-800 transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-indigo-400 px-2 tracking-[0.4em] flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Mission Brief
                            </label>
                            <textarea
                                required
                                rows={5}
                                placeholder="How can I help you today?"
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white outline-none focus:border-indigo-500 font-bold placeholder:text-slate-800 transition-all resize-none shadow-inner"
                            />
                        </div>

                        <MagneticButton className="w-full py-8 bg-indigo-600 text-white font-black rounded-[2rem] uppercase shadow-2xl hover:bg-indigo-500 transition-all tracking-[0.6em] text-[13px] flex items-center justify-center gap-4 group">
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send
                        </MagneticButton>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
