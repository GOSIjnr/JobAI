'use client';

import { motion } from 'framer-motion';
import { Brain, Fingerprint, TrendingUp, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: <Brain className="w-6 h-6 text-violet-400" />,
        title: 'Deep Psychological Analysis',
        description: 'We go beyond resume keywords. Our AI analyzes your cognitive patterns and personality traits.',
    },
    {
        icon: <Fingerprint className="w-6 h-6 text-blue-400" />,
        title: 'Unique Career Fingerprint',
        description: 'Generated from 50+ data points, your career fingerprint is matched against millions of job roles.',
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
        title: 'Predictive Success Modeling',
        description: 'Our algorithms predict not just where you fit, but where you will thrive and grow.',
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
        title: 'Private & Secure',
        description: 'Your psychological profile is encrypted and yours to control. We never sell your data.',
    },
];

export const Features = () => {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why JobMatch is Different</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Traditional job boards match keywords. We match humans.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
