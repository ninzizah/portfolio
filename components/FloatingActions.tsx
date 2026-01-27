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
        <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-4">
            <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                href={`https://api.whatsapp.com/send?phone=${cleanPhoneNumber(siteConfig.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all font-bold"
            >
                <WhatsAppIcon className="w-5 h-5" />
            </motion.a>
            <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href={`tel:${cleanPhoneNumber(siteConfig.phone)}`}
                className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
            >
                <Phone className="w-5 h-5" />
            </motion.a>
        </div>
    );
};

export default FloatingActions;
