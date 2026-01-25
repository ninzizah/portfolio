import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn } from 'lucide-react';

interface LoginModalProps {
    showLogin: boolean;
    setShowLogin: (show: boolean) => void;
    loginForm: { username: string; password: string };
    setLoginForm: (form: { username: string; password: string }) => void;
    handleLogin: (e: React.FormEvent) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
    showLogin,
    setShowLogin,
    loginForm,
    setLoginForm,
    handleLogin,
}) => {
    return (
        <AnimatePresence>
            {showLogin && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLogin(false)}
                        className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                        className="glass w-full max-w-md p-14 rounded-[4rem] relative z-10 text-center border-indigo-500/20"
                    >
                        <LogIn className="w-14 h-14 text-indigo-500 mx-auto mb-10" />
                        <h3 className="text-2xl font-black text-white mb-10 uppercase tracking-[0.3em]">Access Kernel</h3>
                        <form onSubmit={handleLogin} className="space-y-8">
                            <input
                                type="text"
                                placeholder="Access ID"
                                value={loginForm.username}
                                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                autoComplete="off"
                            />
                            <input
                                type="password"
                                placeholder="Passkey"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-indigo-500 font-bold"
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase shadow-2xl hover:bg-indigo-500 transition-all tracking-[0.3em] text-[10px]"
                            >
                                Initialize Login
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
