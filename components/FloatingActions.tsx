import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { SiteConfig } from '../types';
import { cleanPhoneNumber } from '../services/helpers';

interface FloatingActionsProps {
    siteConfig: SiteConfig;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ siteConfig }) => {
    return (
        <div className="fixed bottom-10 right-10 z-[70] flex flex-col gap-6">
            <motion.a
                whileHover={{ scale: 1.15, rotate: -5 }}
                href={`https://api.whatsapp.com/send?phone=${cleanPhoneNumber(siteConfig.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-[1.5rem] bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 transition-all"
            >
                <WhatsAppIcon className="w-8 h-8" />
            </motion.a>
            <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                href={`tel:${cleanPhoneNumber(siteConfig.phone)}`}
                className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
                <Phone className="w-8 h-8" />
            </motion.a>
        </div>
    );
};

export default FloatingActions;
