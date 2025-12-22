'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart2, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CareerMatch {
    title: string;
    match_score: number;
    description: string;
    reasoning: string;
}

interface AnalysisResult {
    recommendations: CareerMatch[];
    analysis: string;
}

export default function ResultsPage() {
    const [results, setResults] = useState<AnalysisResult | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('careerResults');
        if (stored) {
            setResults(JSON.parse(stored));
        }
    }, []);

    if (!results) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading Analysis...</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-24 px-6 container mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium mb-6">
                            <CheckCircle size={16} />
                            <span>Analysis Complete</span>
                        </div>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Your Career DNA Profile</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        {results.analysis || "Based on your responses, we've identified your core cognitive strengths and aligned them with high-growth market opportunities."}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Main Matches Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                            <Briefcase className="w-6 h-6 text-blue-500" /> Top Career Matches
                        </h2>

                        {results.recommendations.map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className={`p-8 rounded-2xl bg-slate-900 border-l-4 border-blue-500 shadow-lg`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold">{job.title}</h3>
                                    <div className={`text-3xl font-black text-blue-400`}>{Math.round(job.match_score * 100)}%</div>
                                </div>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    {job.description}
                                </p>
                                <div className="mt-4 p-4 bg-slate-800/50 rounded-xl text-sm text-slate-300">
                                    <span className="font-semibold text-white">Why you match:</span> {job.reasoning}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar Insights */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                            <BarChart2 className="w-6 h-6 text-violet-500" /> Personality Insights
                        </h2>

                        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                            <h4 className="font-bold text-slate-300 mb-4">Dominant Traits</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1 text-slate-400">
                                        <span>Strategic Thinking</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full">
                                        <div className="h-full w-[92%] bg-violet-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1 text-slate-400">
                                        <span>Empathy</span>
                                        <span>65%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full">
                                        <div className="h-full w-[65%] bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1 text-slate-400">
                                        <span>Risk Tolerance</span>
                                        <span>88%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full">
                                        <div className="h-full w-[88%] bg-emerald-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
