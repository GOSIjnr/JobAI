'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Zap, Target, Brain, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
    { value: 18, suffix: '', label: 'Questions • 4 min' },
    { value: 50, suffix: '+', label: 'Career Paths Analyzed' },
    { value: 2847, suffix: '', label: 'Matches Made This Month' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{count}{suffix}</span>;
}

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-mesh" />
                <div className="absolute inset-0 bg-grid opacity-30" />

                {/* Animated Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-[rgb(var(--accent))] to-cyan-400 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-r from-blue-500 to-[rgb(var(--accent))] rounded-full blur-[150px]"
                />
            </div>

            <div className="w-full max-w-[1200px] mx-auto px-6 py-20">
                <div className="w-full max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 badge badge-accent mb-8">
                            <Zap size={14} />
                            <span>Free • No signup required</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="heading-display mb-6"
                    >
                        Stop guessing
                        <span className="inline-flex w-[1.5ch]">
                            <motion.span
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.2 }}
                            >.</motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.4 }}
                            >.</motion.span>
                        </span>
                        <br />
                        <span className="text-gradient">Start knowing.</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto mb-10"
                    >
                        Answer 18 focused questions about how you actually work—not who you wish you were.
                        We'll match you with careers that fit your real strengths, not just your resume.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link href="/questionnaire" className="btn btn-primary btn-lg group">
                            Start Free Assessment
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="btn btn-secondary btn-lg group">
                            <div className="w-8 h-8 rounded-full bg-[rgb(var(--accent))] flex items-center justify-center mr-1">
                                <Play size={14} className="text-white ml-0.5" />
                            </div>
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[rgb(var(--text-primary))] mb-1">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-sm text-[rgb(var(--text-muted))]">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Feature Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-24 flex flex-wrap justify-center gap-4"
                >
                    {[
                        { icon: Brain, label: 'Trait Analysis' },
                        { icon: Target, label: 'Precision Matching' },
                        { icon: TrendingUp, label: 'Growth Insights' },
                    ].map((item, i) => (
                        <div key={i} className="card-glass flex items-center gap-3 px-5 py-3 rounded-full">
                            <item.icon size={18} className="text-[rgb(var(--accent))]" />
                            <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgb(var(--bg-base))] to-transparent" />
        </section>
    );
};
