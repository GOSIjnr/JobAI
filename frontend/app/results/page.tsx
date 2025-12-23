'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import {
    CheckCircle, BarChart3, TrendingUp, AlertCircle,
    RefreshCw, Lightbulb, ArrowRight, Award, BookOpen, Sparkles, ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CareerMatch {
    title: string;
    match_score: number;
    description: string;
    reasoning: string;
    confidence?: string;
    category?: string;
    matched_traits?: string[];
    skills_gap?: Array<{ trait: string; skill: string; suggested_course: string }>;
    alternative_paths?: Array<{ career: string; category: string; match_score: number; shared_traits: string[] }>;
}

interface TraitData {
    trait: string;
    score: number;
    normalized: number;
    level: string;
}

interface AnalysisResult {
    recommendations: CareerMatch[];
    analysis: string;
    trait_profile?: TraitData[];
    answer_distribution?: Record<string, number>;
    total_questions?: number;
    low_engagement?: boolean;
}

export default function ResultsPage() {
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCareer, setActiveCareer] = useState(0);

    useEffect(() => {
        document.title = 'Your Career Matches | JobMatch';
        try {
            const stored = localStorage.getItem('careerResults');
            if (stored) {
                const parsed = JSON.parse(stored);
                setResults(parsed.recommendations ? parsed : parsed.data);
            } else {
                setError('No results found.');
            }
        } catch {
            setError('Failed to load results.');
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-base))]">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[rgb(var(--accent))] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[rgb(var(--text-muted))]">Loading results...</p>
                </div>
            </div>
        );
    }

    if (error || !results) {
        return (
            <div className="min-h-screen flex flex-col bg-[rgb(var(--bg-base))]">
                <Header />
                <main className="flex-grow flex items-center justify-center px-6 pt-20">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                            <AlertCircle size={32} className="text-red-400" />
                        </div>
                        <h2 className="heading-2 mb-3">{error || 'Something went wrong'}</h2>
                        <p className="text-[rgb(var(--text-muted))] mb-8">Take the assessment to see your matches.</p>
                        <Link href="/questionnaire" className="btn btn-primary">
                            Take Assessment
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (results.low_engagement) {
        return (
            <div className="min-h-screen flex flex-col bg-[rgb(var(--bg-base))]">
                <Header />
                <main className="flex-grow pt-24 pb-12 px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                            <Lightbulb size={32} className="text-amber-400" />
                        </div>
                        <h1 className="heading-1 mb-4">Let's Try Again</h1>
                        <p className="text-[rgb(var(--text-muted))] mb-8">{results.analysis}</p>
                        <Link href="/questionnaire" className="btn btn-primary">
                            Retake Assessment
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const topCareer = results.recommendations[activeCareer];
    const traits = results.trait_profile?.filter(t => t.level === 'high' || t.score > 1).slice(0, 5) || [];

    return (
        <div className="min-h-screen flex flex-col bg-[rgb(var(--bg-base))]">
            <Header />

            <main className="flex-grow pt-20 pb-16 px-6">
                <div className="absolute inset-0 bg-mesh opacity-30" />

                <div className="container mx-auto max-w-6xl relative">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span className="badge badge-success mb-4 inline-flex">
                            <CheckCircle size={14} /> Analysis Complete
                        </span>
                        <h1 className="heading-1 mb-4">
                            Your Career <span className="text-gradient">Matches</span>
                        </h1>
                        <p className="text-[rgb(var(--text-muted))] max-w-2xl mx-auto">{results.analysis}</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Career Cards */}
                        <div className="lg:col-span-2 space-y-4">
                            {results.recommendations.map((job, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setActiveCareer(i)}
                                    className={`card cursor-pointer transition-all ${i === activeCareer
                                        ? 'ring-2 ring-[rgb(var(--accent))] border-transparent'
                                        : 'hover:border-[rgb(var(--border-default))]'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {i === 0 && (
                                                <span className="badge badge-accent text-xs mb-2">
                                                    <Sparkles size={10} /> Top Match
                                                </span>
                                            )}
                                            <h3 className="heading-3 mb-1">{job.title}</h3>
                                            <p className="text-sm text-[rgb(var(--text-muted))] mb-3">{job.category}</p>
                                            <p className="text-sm text-[rgb(var(--text-secondary))] line-clamp-2">{job.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {job.matched_traits?.slice(0, 3).map((t, idx) => (
                                                    <span key={idx} className="text-xs px-2 py-1 rounded bg-[rgb(var(--glass-bg))] text-[rgb(var(--text-muted))]">
                                                        {t.replace(/-/g, ' ')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="ml-6 text-center">
                                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold ${job.match_score >= 80
                                                ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 text-green-400'
                                                : job.match_score >= 60
                                                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-400'
                                                    : 'bg-gradient-to-br from-gray-500/20 to-gray-500/10 text-gray-400'
                                                }`}>
                                                {Math.round(job.match_score)}%
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Selected Career Details */}
                            {topCareer && (
                                <div className="card">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Award size={18} className="text-[rgb(var(--accent))]" />
                                        <h3 className="font-semibold text-[rgb(var(--text-primary))]">Why This Matches</h3>
                                    </div>
                                    <p className="text-sm text-[rgb(var(--text-muted))] mb-4">{topCareer.reasoning}</p>

                                    {topCareer.skills_gap && topCareer.skills_gap.length > 0 && (
                                        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-4">
                                            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-2">
                                                <BookOpen size={14} /> Skills to Develop
                                            </div>
                                            <ul className="text-xs text-amber-400/80 space-y-1">
                                                {topCareer.skills_gap.slice(0, 2).map((gap, idx) => (
                                                    <li key={idx}>{gap.skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {topCareer.alternative_paths && topCareer.alternative_paths.length > 0 && (
                                        <div className="p-4 rounded-lg bg-[rgb(var(--accent))]/10 border border-[rgb(var(--accent))]/20 mt-4">
                                            <div className="flex items-center gap-2 text-[rgb(var(--accent))] text-sm font-medium mb-2">
                                                <TrendingUp size={14} /> Related Paths
                                            </div>
                                            {topCareer.alternative_paths.slice(0, 2).map((alt, idx) => (
                                                <div key={idx} className="flex justify-between text-xs text-[rgb(var(--accent-light))] mb-1">
                                                    <span>{alt.career}</span>
                                                    <span>{alt.match_score}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Trait Profile */}
                            <div className="card">
                                <div className="flex items-center gap-2 mb-4">
                                    <BarChart3 size={18} className="text-[rgb(var(--accent))]" />
                                    <h3 className="font-semibold text-[rgb(var(--text-primary))]">Your Traits</h3>
                                </div>
                                {traits.length > 0 ? (
                                    <div className="space-y-4">
                                        {traits.map((trait, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-[rgb(var(--text-muted))] capitalize">{trait.trait.replace(/-/g, ' ')}</span>
                                                    <span className="text-[rgb(var(--text-primary))] font-medium">{trait.normalized}%</span>
                                                </div>
                                                <div className="progress">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${trait.normalized}%` }}
                                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                                        className="progress-fill"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[rgb(var(--text-muted))]">Complete full assessment for trait profile.</p>
                                )}
                            </div>

                            {/* Actions */}
                            <Link href="/questionnaire" className="btn btn-secondary w-full">
                                <RefreshCw size={16} /> Retake Assessment
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
