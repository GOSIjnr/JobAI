'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';

interface Question {
    id: string;
    text: string;
    category?: string;
}

export default function QuestionnairePage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const router = useRouter();

    // Enhanced questions for better career mapping
    useEffect(() => {
        setQuestions([
            // ANALYTICAL / LOGICAL (Dataset 1)
            { id: '1', text: 'I enjoy spotting patterns and trends in large sets of information.', category: 'analytical' },
            { id: '2', text: 'I truly enjoy solving complex logical puzzles in my free time.', category: 'analytical' },
            { id: '3', text: 'I like making decisions based on hard data rather than intuition.', category: 'analytical' },

            // TECHNICAL / SYSTEM (Dataset 2)
            { id: '4', text: 'I prefer understanding how a machine works "under the hood" rather than just using it.', category: 'technical' },
            { id: '5', text: 'I am interested in automating repetitive tasks to save time.', category: 'technical' },
            { id: '6', text: 'I care deeply about the performance and speed of a system.', category: 'technical' },
            { id: '7', text: 'I enjoy configuring and securing computer networks or servers.', category: 'technical' },

            // CREATIVE / VISUAL (Dataset 3)
            { id: '8', text: 'I am drawn to visual aesthetics, color theory, and typography.', category: 'creative' },
            { id: '9', text: 'I prefer tangible results I can see and touch (like a UI) over abstract logic.', category: 'creative' },
            { id: '10', text: 'I enjoy sketching or designing layouts before building something.', category: 'creative' },

            // SOCIAL / LEADERSHIP (Dataset 4)
            { id: '11', text: 'I find satisfaction in organizing people and resources to achieve a goal.', category: 'leadership' },
            { id: '12', text: 'I enjoy mentoring others and explaining complex concepts simply.', category: 'communication' },
            { id: '13', text: 'I prefer working collaboratively in a team rather than in isolation.', category: 'social' },
            { id: '14', text: 'I am interested in the business side of products (revenue, market fit).', category: 'business' },

            // ADAPTABILITY / ENVIRONMENT (Dataset 5)
            { id: '15', text: 'I thrive in fast-paced environments where requirements change frequently.', category: 'adaptability' },
            { id: '16', text: 'I get bored doing the same task; I need variety and new challenges.', category: 'variety' },
            { id: '17', text: 'I am comfortable with undefined problems and figuring out solutions from scratch.', category: 'adaptability' },

            // SECURITY / RISK (Dataset 6)
            { id: '18', text: 'I worry about how to break a system or finding its vulnerabilities.', category: 'security' },
            { id: '19', text: 'I prioritize stability, safety, and reliability over new cutting-edge features.', category: 'stability' },

            // LEARNING (Dataset 7)
            { id: '20', text: 'I spend my free time learning about the latest technology trends and tools.', category: 'learning' }
        ]);
        // Clear old results to force fresh analysis
        localStorage.removeItem('careerResults');
    }, []);

    const handleAnswer = (text: string) => {
        const newAnswers = [...answers, text];
        setAnswers(newAnswers);

        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            // Show submit screen
            setIsCompleted(true);
        }
    };

    const submitForAnalysis = async (finalAnswers: string[]) => {
        try {
            // Combine questions with answers for context
            const payload = questions.map((q, i) => ({
                question: q.text,
                answer: finalAnswers[i]
            }));

            // User ID is mocked for now, in real app would come from Auth context
            const res = await fetch('http://localhost:4000/api/answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 'demo-user-123', answers: payload })
            });
            const data = await res.json();

            if (data.success && data.recommendations) {
                localStorage.setItem('careerResults', JSON.stringify(data));
                router.push('/results');
            } else {
                console.error("Failed to get recommendations");
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    if (questions.length === 0) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading Assessment...</div>;

    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-center px-6 pt-20">
                <div className="w-full max-w-2xl">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                            <span>Question {currentIdx + 1} of {questions.length}</span>
                            <span>{Math.round(progress)}% Complete</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Question Card or Submit Card */}
                    <AnimatePresence mode="wait">
                        {!isCompleted ? (
                            <motion.div
                                key={currentIdx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5">
                                    <CheckCircle2 size={120} />
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug relative z-10">
                                    {q.text}
                                </h2>

                                <div className="space-y-3 relative z-10">
                                    {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((opt, i) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleAnswer(opt)}
                                            className="w-full py-4 px-6 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-blue-600 hover:border-blue-500 transition-all text-left flex items-center justify-between group"
                                        >
                                            <span className="font-medium group-hover:text-white text-slate-300">{opt}</span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="submit"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-900 border border-slate-800 p-12 rounded-3xl shadow-2xl text-center"
                            >
                                <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-full mb-6 text-green-500">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Profile Completed!</h2>
                                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                    We have gathered enough data to analyze your career DNA. Click below to generate your personalized career map.
                                </p>
                                <button
                                    onClick={() => submitForAnalysis(answers)}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-lg"
                                >
                                    Generate Analysis
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
