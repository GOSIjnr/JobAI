'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Zap, Target, Brain, TrendingUp, Map } from 'lucide-react';
import { useEffect, useState } from 'react';

// Calculate progressive match count based on time
function getMatchCount(): number {
    const startDate = new Date('2024-12-24T00:00:00').getTime();
    const now = Date.now();
    const hoursSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60));
    const baseCount = 1220;
    const increment = hoursSinceStart * 97;
    return baseCount + increment;
}

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

    return <span>{count.toLocaleString()}{suffix}</span>;
}

function MatchCounter() {
    const [matchCount, setMatchCount] = useState(1220);

    useEffect(() => {
        setMatchCount(getMatchCount());
        const interval = setInterval(() => {
            setMatchCount(getMatchCount());
        }, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return <AnimatedCounter value={matchCount} suffix="" />;
}

const stats = [
    { value: 20, suffix: '', label: 'Questions', sublabel: '5 min', dynamic: false },
    { value: 60, suffix: '+', label: 'Career Paths', sublabel: 'Analyzed', dynamic: false },
    { value: 0, suffix: '', label: 'Matches', sublabel: 'Made', dynamic: true },
];

const featurePills = [
    { icon: Brain, label: 'Trait Analysis', href: null },
    { icon: Target, label: 'Precision Matching', href: null },
    { icon: TrendingUp, label: 'Growth Insights', href: null },
    { icon: Map, label: 'Career Roadmaps', href: '/roadmap' },
];

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 pb-8 sm:pt-16 sm:pb-0 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-mesh" />
                <div className="absolute inset-0 bg-grid opacity-20 sm:opacity-30" />

                {/* Animated Gradient Orbs - Larger on mobile for immersive feel */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-20 sm:-left-32 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-[rgb(var(--accent))] to-cyan-400 rounded-full blur-[100px] sm:blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/4 -right-20 sm:-right-32 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-gradient-to-r from-blue-500 to-[rgb(var(--accent))] rounded-full blur-[120px] sm:blur-[150px]"
                />
            </div>

            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-20">
                <div className="w-full max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 badge badge-accent mb-6 sm:mb-8">
                            <Zap size={14} />
                            <span>Free • No signup • 5 min</span>
                        </div>
                    </motion.div>

                    {/* Headline - Larger and bolder on mobile */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="heading-display mb-4 sm:mb-6 px-2"
                    >
                        From <span className="text-gray-500 line-through">confused</span> to
                        <br />
                        <span className="text-gradient">confident in 5 minutes.</span>
                    </motion.h1>

                    {/* Subheadline - More concise on mobile */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto mb-6 sm:mb-6 px-2"
                    >
                        <span className="mobile-only">
                            Answer 20 simple questions. Discover careers that truly fit you.
                        </span>
                        <span className="desktop-only">
                            Answer 20 simple questions about your everyday habits—no tech knowledge needed.
                            We'll discover your natural work style and match you to careers that truly fit.
                        </span>
                    </motion.p>

                    {/* Testimonials - Hidden on smallest screens, simplified on mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="hidden sm:flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-8 sm:mb-10"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>"Finally found my path" — <span className="text-gray-300">Sarah, UX Designer</span></span>
                        </div>
                        <div className="hidden md:block text-gray-600">•</div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>"Landed my dream job" — <span className="text-gray-300">Mike, DevOps Engineer</span></span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons - Full width and stacked on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 mb-10 sm:mb-16"
                    >
                        <Link href="/questionnaire" className="btn btn-primary btn-lg w-full sm:w-auto group">
                            Start Free Assessment
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="btn btn-secondary btn-lg w-full sm:w-auto group">
                            <div className="w-8 h-8 rounded-full bg-[rgb(var(--accent))] flex items-center justify-center mr-1">
                                <Play size={14} className="text-white ml-0.5" />
                            </div>
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats - Vertical on mobile, horizontal on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md sm:max-w-lg mx-auto"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(var(--text-primary))] mb-0.5 sm:mb-1">
                                    {stat.dynamic ? (
                                        <MatchCounter />
                                    ) : (
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    )}
                                </div>
                                <div className="text-xs sm:text-sm text-[rgb(var(--text-muted))]">
                                    <span className="block sm:inline">{stat.label}</span>
                                    <span className="hidden sm:inline"> • </span>
                                    <span className="block sm:inline text-[rgb(var(--text-muted))]">{stat.sublabel}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Feature Pills - Horizontal scroll on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 sm:mt-24"
                >
                    {/* Mobile: Swipeable */}
                    <div className="sm:hidden swipe-container -mx-4 px-4">
                        {featurePills.map((item, i) => (
                            item.href ? (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="swipe-item card-glass flex items-center gap-3 px-5 py-3 rounded-full touch-feedback"
                                >
                                    <item.icon size={18} className="text-[rgb(var(--accent))]" />
                                    <span className="text-sm font-medium text-[rgb(var(--text-secondary))] whitespace-nowrap">{item.label}</span>
                                </Link>
                            ) : (
                                <div key={i} className="swipe-item card-glass flex items-center gap-3 px-5 py-3 rounded-full">
                                    <item.icon size={18} className="text-[rgb(var(--accent))]" />
                                    <span className="text-sm font-medium text-[rgb(var(--text-secondary))] whitespace-nowrap">{item.label}</span>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Desktop: Flex wrap */}
                    <div className="hidden sm:flex flex-wrap justify-center gap-4">
                        {featurePills.map((item, i) => (
                            item.href ? (
                                <Link key={i} href={item.href} className="card-glass flex items-center gap-3 px-5 py-3 rounded-full hover:border-[rgb(var(--accent))/50] transition-colors">
                                    <item.icon size={18} className="text-[rgb(var(--accent))]" />
                                    <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">{item.label}</span>
                                </Link>
                            ) : (
                                <div key={i} className="card-glass flex items-center gap-3 px-5 py-3 rounded-full">
                                    <item.icon size={18} className="text-[rgb(var(--accent))]" />
                                    <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">{item.label}</span>
                                </div>
                            )
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[rgb(var(--bg-base))] to-transparent" />
        </section>
    );
};
